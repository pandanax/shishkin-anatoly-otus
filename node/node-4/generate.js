const {generate} = require('./lib/generate-file');
const {MAX_NUMBER, COUNT_IN_FILE, FILE_NAME, DELIMITER} = require('./lib/constants');

generate({
    fileName: FILE_NAME,
    delimiter: DELIMITER,
    countInFile: COUNT_IN_FILE,
    maxNumber: MAX_NUMBER,
}).catch(console.error);


