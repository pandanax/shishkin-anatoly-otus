const {Delimited} = require('./delimited');
const fs = require('fs');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

async function createFiles({
    fileName: name,
    countPerFile: perFile,
    splitFolderName,
    delimiter,
}) {

    console.log(`Reading file ${name}`);

    let filesData = [];
    const fileName = name.substring(0, name.lastIndexOf('.'));
    const fileExt = name.substring(name.lastIndexOf('.'));
    let fileIndex = 1;

    const readStream = fs.createReadStream(name, {encoding: 'utf8'});

    if (fs.existsSync(splitFolderName)) {
        fs.rmSync(splitFolderName, { recursive: true, force: true });
        console.log(`directory ${splitFolderName} deleted`);
    }

    fs.mkdirSync(splitFolderName);
    console.log(`directory ${splitFolderName} created`);


    let shouldReset = false;

    //будет выплевывать целиком часть входного файла
    async function* splitFileData(chunk) {
        for await (const currentNumber of chunk) {
            if (shouldReset) {
                filesData.length = 0;
                shouldReset = false;
            }
            filesData.push(currentNumber);
            if (filesData.length >= perFile) {
                shouldReset = true;
                yield filesData;
            }
        }
    }

    //сортируем внутри мелкого файла и пишем на входной текущий поток
    async function* writeFile(dataStream) {
        for await (const data of dataStream) {
            const joinedData =  data.sort((a,b)=> a - b).join(delimiter);
            const splitFilePath = `./${splitFolderName}/${fileName}${fileIndex++}${fileExt}`;
            console.log(`File ${splitFilePath} preparing...`);
            const fw = fs.createWriteStream(splitFilePath, {encoding: "utf8"});
            fw.write(joinedData);
            fw.close();
        }
    }

    const transform = new Delimited(delimiter);

    await pipeline(
        readStream, //читаем
        transform, //по одному числу
        splitFileData, //собираем по файлам
        writeFile, //пишем в файл
    );

}

exports.split = ({
    fileName,
    countPerFile,
    splitFolderName,
    delimiter,
}) => createFiles({
    fileName,
    countPerFile,
    splitFolderName,
    delimiter,
})
    .then(() => {
        console.log('All files saved.')
        return {
            fileName,
            countPerFile,
            splitFolderName,
            delimiter,
        }
    })
    .catch(console.error);
