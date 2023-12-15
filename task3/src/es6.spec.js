const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(!!dic, true);
        });

        it('корректно добавляет новые элементы', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(dic.add("1", "2"), true);
            assert.strictEqual(dic.add(1, "2"), false);
            assert.strictEqual(dic.add("1", null), false);
        });

        it('корректно отрабатывает метод get()', () => {
            const dic = new core.Dictionary();
            dic.add("1", "2");

            assert.strictEqual(dic.get("1"), "2");
            assert.strictEqual(dic.get("tes"), null);
            assert.strictEqual(dic.get(4), null);
        });

        it('корректно удаляет элементы', () => {
            const dic = new core.Dictionary();
            dic.add("1", "2");
            
            assert.strictEqual(dic.remove("1"), true);
            assert.strictEqual(dic.remove("tes"), false);
            assert.strictEqual(dic.remove(undefined), false);
        });

        it('корректно возвращает размер словаря', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(dic.length(), 0);

            dic.add("1", "2");
            assert.strictEqual(dic.length(), 1);
        });
    });
});