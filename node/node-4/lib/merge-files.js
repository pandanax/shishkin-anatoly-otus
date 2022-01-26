const fs = require('fs');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

let currentMinValue;

//создаем потоки для чтения из папки с заспличенными файлами
function createStreams(name, splitFolderName) {
    const fileName = name.substring(0, name.lastIndexOf('.'));
    const fileExt = name.substring(name.lastIndexOf('.'));
    const files = [];
    let fileIndex = 1;
    while (true) {
        const splitFilePath = `./${splitFolderName}/${fileName}${fileIndex++}${fileExt}`;
        if (!fs.existsSync(splitFilePath)) {
            break;
        }
        files.push(splitFilePath);
    }
    return files.map(fileName => fs.createReadStream(fileName, {encoding: 'utf8'}));
};


function getMinValue(meta) {
    return Math.min(...meta.filter(({done}) => !done).map(({min}) => min));
}

function getSuitedStreams(meta) {
    return meta.filter(({min, done}) => min <= currentMinValue && !done);
}

function isAllInitialized(meta) {
    return meta.filter(({initialized}) => initialized).length === meta.length;
}

function isAllDone(meta) {
    return meta.filter(({done}) => done).length === meta.length;
}

//получаем итератор который каждый раз возвращает одно число из потока
//который на данный момент имеем минимальное текущее значение
function getIterable(meta, delimiter) {
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    const suitedStreams = getSuitedStreams(meta);

                    if (suitedStreams.length) {
                        const {
                            currentStream,
                            currentStreamIndex,
                            done
                        } = suitedStreams[0];


                        let buffer = '';
                        while (true) {
                            const chunk = currentStream.read(1);
                            if ((buffer + chunk).includes(delimiter) || chunk === null) {
                                break;
                            } else {
                                buffer += chunk;
                            }
                        }

                        const oldMinValue = meta[currentStreamIndex].min;

                        if (Number(buffer) || buffer === '0') {


                            meta[currentStreamIndex].min = Number(buffer);

                            currentMinValue = getMinValue(meta);

                            return {value: `${oldMinValue}${delimiter}`, done: false};
                        } else {
                            meta[currentStreamIndex].done = true;
                            currentMinValue = getMinValue(meta);
                            return {value: `${oldMinValue}${isAllDone(meta) ? '' : delimiter}`, done: false};
                        }

                    } else {

                            return {value: undefined, done: true};

                    }
                }
            };
        }
    };
}

//инициализируемся, готовим потоки, метаинформацию, читаем первое число из каждого потока
function init(fileName, splitFolderName, delimiter, outFileName) {

    console.log(`File ${outFileName} preparing from ./${splitFolderName} folder ...`)

    //создаем выходной поток
    const writeStream = fs.createWriteStream(outFileName, {encoding: 'utf8'});

    //получаем стримы всех файлов
    const streams = createStreams(fileName, splitFolderName);

    //создаем хранилище вида [{done, currentStreamIndex, currentStream, min, initialized}, {...}, ....];
    const meta = [];
    meta.length = streams.length;

    return new Promise(resolve => {

        //проверка что все потоки проинициализировались
        function checkMetaAndStartPipe() {
            const AllInitialized = isAllInitialized(meta);
            if (AllInitialized) {
                currentMinValue = getMinValue(meta);
                const iterable = getIterable(meta, delimiter);
                resolve({
                    iterable,
                    writeStream
                });
            }
        }

        streams.forEach((
            currentStream,
            currentStreamIndex,
        ) => {
            currentStream.on('readable', () => {
                if (!meta[currentStreamIndex]) {
                    meta[currentStreamIndex] = {
                        done: false,
                        currentStreamIndex,
                        currentStream,
                        min: undefined,
                    };
                    let buffer = '';
                    while (true) {
                        const chunk = currentStream.read(1);
                        if ((buffer + chunk).includes(delimiter)) {
                            break;
                        } else {
                            buffer += chunk;
                        }
                    }
                    //устанавливаем первичное min значение для каждого потока
                    meta[currentStreamIndex].min = Number(buffer);
                    meta[currentStreamIndex].initialized = true;
                    checkMetaAndStartPipe();
                }
            });
        });
    });
}

exports.merge = ({
    filePath,
    splitName,
    delimiter,
    outFileName
}) => init(filePath, splitName, delimiter, outFileName).then(({iterable, writeStream}) => pipeline(
    stream.Readable.from(iterable),
    writeStream,
)).then(() => {
    console.log(`File ${outFileName} saved`)
});
