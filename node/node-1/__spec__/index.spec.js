const {run, isValidData, getPrefix, printLevelStr} = require('../index');
const {dataMock} = require('./mock');

describe("Вывод дерева", () => {

    describe("run", () => {
        describe("с валидными данными", () => {
            beforeAll(() => {
                jest.spyOn(global.console, 'log');
                JSON.parse = jest.fn().mockImplementation(() => dataMock);
            });
            test('должен вызвать console.log 5 раз', () => {
                run();
                expect(console.log).toBeCalledTimes(5);
            });
            test('должен сначала вывести число', () => {
                run();
                expect(console.log).toHaveBeenNthCalledWith(1, expect.stringMatching(/\d/));
            });

            test('должен 2-й строкой вывести значок сдвига 2-го уровня и число', () => {
                run();
                expect(console.log).toHaveBeenNthCalledWith(2, expect.stringMatching(/├── \d/));
            });

            test('должен 3-й строкой вывести значок сдвига 3-го уровня и число', () => {
                run();
                expect(console.log).toHaveBeenNthCalledWith(3, expect.stringMatching(/│ └── \d/));
            });

            test('должен 4-й строкой снова вывести 2-й уровень и число', () => {
                run();
                expect(console.log).toHaveBeenNthCalledWith(4, expect.stringMatching(/├── \d/));
            });

            afterAll(() => {
                jest.clearAllMocks();
            });
        });
        describe("с невалидными данными", () => {
            beforeAll(() => {
                jest.spyOn(global.console, 'error');
                JSON.parse = jest.fn().mockImplementation(() => {
                    throw Error('some error');
                });
            });
            test('должен вызвать console.error 1 раз', () => {
                run();
                expect(console.error).toBeCalledTimes(1);
            });
            afterAll(() => {
                jest.clearAllMocks();
            });
        });
    });

    describe("printLevelStr", () => {
        describe("с валидными данными", () => {
            beforeAll(() => {
                jest.spyOn(global.console, 'log');
            });
            test('должен вызвать console.log 5 раз', () => {
                printLevelStr(dataMock, 0);
                expect(console.log).toBeCalledTimes(5);
            });
            afterAll(() => {
                jest.clearAllMocks();
            });
        });
        describe("с невалидными данными", () => {

            test('должен вызвать ошибку', () => {
                expect(() => printLevelStr( 'some')).toThrowError('Invalid input data');
            });

        });
    });


    describe("isValidData", () => {
        test('должен вернуть true при правильных параметрах', () => {
            expect(isValidData({name: "1"})).toBeTruthy();
        });
        test('должен вернуть false при отсутствии name в параметрах', () => {
            expect(isValidData({nam: "1"})).toBeFalsy();
        });
        test('должен вернуть false если параметр не объект', () => {
            expect(isValidData("notIsObject")).toBeFalsy();
        });
    });

    describe("getPrefix", () => {
        test('должен вернуть пустоту на нулевом уровне', () => {
            expect(getPrefix(0)).toBeFalsy();
        });

        test('должен вернуть знак 2 уровня', () => {
            expect(getPrefix(1)).toBe("├── ");
        });

        test('должен вернуть знак 3 уровня', () => {
            expect(getPrefix(2)).toBe("│ └── ");
        });

        test('должен вернуть знак 6 уровня', () => {
            expect(getPrefix(5)).toBe("│    └── ");
        });

    });
});
