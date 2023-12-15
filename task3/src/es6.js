"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
  let splitted = fio.split(' ');
  return `${splitted[1]} ${splitted[0]}`;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
  return Array.from(new Set(array));
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
// присмотритесь к методу .reduce
function calculateSalaryDifference(array) {
  if (array.length === 0)
    return false;

  return Math.max.apply(null, array) / Math.min.apply(null, array);
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
  constructor() {
    this.dictionary = new Map();
  }


  add(key, value) {
    if (!this.#checker(key) || !this.#checker(value))
      return false;

    this.dictionary.set(key, value);
    return true;
  }


  get(key) {
    if (!this.#checker(key) || !this.dictionary.has(key))
      return null;

    return this.dictionary.get(key);
  }


  remove(key) {
    if (!this.#checker(key) || !this.dictionary.has(key))
      return false;

    return this.dictionary.delete(key);
  }


  length() {
    return this.dictionary.size;
  }


  #checker(str) {
    return str !== null && typeof str !== "undefined" && typeof str === "string";
  }
}

module.exports = {
  fioToName,
  filterUnique,
  Dictionary,
  calculateSalaryDifference
};