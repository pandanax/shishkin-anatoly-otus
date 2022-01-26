const fs = require('fs');

const stream = require('stream');
const util = require('util');
const pipeline = util.promisify(stream.pipeline);

let current = 0;
let isFirst = 0;

function getReadable(count, maxNum) {
    const iterable = {
        [Symbol.iterator]() {
            return {
                next() {
                    return {value: Math.floor(Math.random() * maxNum), done: !(current++ < count)};
                }
            };
        }
    };
    return stream.Readable.from(iterable);
}

async function run({fileName, delimiter, countInFile, maxNumber}) {
    console.log(`File ${fileName} preparing...`);
    await pipeline(
        getReadable(countInFile, maxNumber),
        async function* (source) {
            for await (const number of source) {
                yield `${(isFirst++ ? delimiter : '')}${number}`;
            }
        },
        fs.createWriteStream(fileName, {encoding: 'utf8'})
    );
}

exports.generate = ({
    fileName,
    delimiter,
    countInFile,
    maxNumber
}) => run({
    fileName,
    delimiter,
    countInFile,
    maxNumber
})
    .then(() => {
        console.log(`File ${fileName} saved! `);
        return {fileName, delimiter};
    })
    .catch(console.error);


