//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return (n | 0) === n;
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    let array = [];
    let i = 1;
    do {
        if (!(i % 2)) array.push(i);
        i++;
    } while (array[array.length - 1] != 20 || array.length === 0);
    return array;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    if (n <= 0) return 0;
    let sum = 0;
    for (let i = 1; i <= n; ++i) {
        sum += i;
    }
    return sum;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    if (n <= 0) {
        return 0;
    }
    return n + recSumTo(n - 1);
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    if (n >= 0) return n === 0 ? 1 : factorial(n - 1) * n;
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    return n > 0 && (n & -n) == n;
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let initValue = initialValue;
    return function result(value) {
        if (!!operatorFn) initValue = operatorFn(initValue, value);
        return initValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано то оно равно 0.
 * Если шаг не угазан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг полседовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    let number = start - step;
    return () => {
        number += step;
        return number;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй оббъект
 * @returns {boolean} - true если объекты равны(по сожержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject) {
        return true;
    } else if (typeof firstObject == 'number' && isNaN(firstObject) && typeof secondObject == 'number' && isNaN(secondObject)){
        return true;
    } else if (
        typeof firstObject == 'object' && firstObject != null 
		&&
        typeof secondObject == 'object' && secondObject != null
    ) {
        if (Object.keys(firstObject).length != Object.keys(secondObject).length)
            return false;

        for (let temp in firstObject) {
            if (secondObject.hasOwnProperty(temp)) {
                if (!deepEqual(firstObject[temp], secondObject[temp]))
                    return false;
            } else return false;
        }

        return true;
    } else return false;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
