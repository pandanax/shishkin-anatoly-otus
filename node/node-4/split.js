const {split} = require('./lib/split-file');
const {COUNT_PER_FILE, SPLIT_FOLDER_NAME, FILE_NAME, DELIMITER} = require('./lib/constants');

split({
    fileName: FILE_NAME,
    delimiter: DELIMITER,
    countPerFile: COUNT_PER_FILE,
    splitFolderName: SPLIT_FOLDER_NAME,
}).catch(console.error);



