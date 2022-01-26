const {merge} = require('./lib/merge-files');
const {SPLIT_FOLDER_NAME, FILE_NAME, DELIMITER, OUT_FILE_NAME} = require('./lib/constants');

merge({
    filePath: FILE_NAME,
    splitName: SPLIT_FOLDER_NAME,
    delimiter: DELIMITER,
    outFileName: OUT_FILE_NAME
}).catch(console.error);

