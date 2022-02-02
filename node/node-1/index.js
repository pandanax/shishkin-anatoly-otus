const fs = require('fs');

function isValidData(levelData) {
    return typeof levelData === 'object' && levelData && levelData.name !== undefined;
}

function getPrefix(levelNumber) {
    switch (levelNumber) {
        case 0:
            return '';
        case 1:
            return '├── ';
        default:
            return `│${" ".repeat(levelNumber - 1)}└── `;
    }
}

function printLevelStr(levelData, levelNumber = 0) {
    if (isValidData(levelData)) {
        const prefix = getPrefix(levelNumber);
        const name = levelData.name;
        console.log(`${prefix}${name}`);
        if (Array.isArray(levelData.items)) {
            levelData.items.forEach(item => printLevelStr(item, levelNumber + 1));
        }
    } else {
        throw Error('Invalid input data');
    }
}

function run() {
    try {
        const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        printLevelStr(data, 0);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    run,
    isValidData,
    getPrefix,
    printLevelStr,
};

run();
