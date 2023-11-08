/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Со звездочкой: реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  dist() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
  constructor(x, y, z = 0) {
    super(x, y);
    this.z = z;
  }

  static vectorLength(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2));
  }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Со звездочкой: написать тесты методы класса (oop.spec.js)
 */
class Queue {

  constructor(array = []) {
    this.values = array;
  }

  push(x) {
    this.values.push(x);
  }

  pop() {
    if (!this.values.length) return false;
    return this.values.shift();
  }
}

module.exports = {
  Point,
  Point3D,
  Queue,
};
