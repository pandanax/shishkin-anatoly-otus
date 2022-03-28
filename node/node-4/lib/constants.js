exports.MAX_NUMBER = 1000000; //Максимальное число которое может быть в файле
exports.COUNT_IN_FILE = 16000000; // экспериментально подобрано чтоб файл был точно больше 100 МБ :)
exports.COUNT_SPLIT = 50; //на сколько файлов бьем
exports.COUNT_PER_FILE = exports.COUNT_IN_FILE / exports.COUNT_SPLIT; //на сколько файлов бьем
exports.SPLIT_FOLDER_NAME = 'split'; //папка в которую будут складываться разбитые отсортированные куски
exports.FILE_NAME = 'in.txt'; //входной файл
exports.OUT_FILE_NAME = 'out.txt'; //выходной файл
exports.DELIMITER = ' '; //разделитель
