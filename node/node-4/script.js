const {generate} = require('./lib/generate-file');
const {MAX_NUMBER, COUNT_IN_FILE, FILE_NAME, DELIMITER, COUNT_PER_FILE, SPLIT_FOLDER_NAME, OUT_FILE_NAME} = require('./lib/constants');
const {split} = require('./lib/split-file');
const {merge} = require('./lib/merge-files');

generate({
    fileName: FILE_NAME,
    delimiter: DELIMITER,
    countInFile: COUNT_IN_FILE,
    maxNumber: MAX_NUMBER,
}).then(() => split({
    fileName: FILE_NAME,
    delimiter: DELIMITER,
    countPerFile: COUNT_PER_FILE,
    splitFolderName: SPLIT_FOLDER_NAME,
})).then(() => merge({
    filePath: FILE_NAME,
    splitName: SPLIT_FOLDER_NAME,
    delimiter: DELIMITER,
    outFileName: OUT_FILE_NAME
})).catch(console.error);

