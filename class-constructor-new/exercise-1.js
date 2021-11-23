export class Vector extends Array {
  constructor(argIn) {
    if (!Vector.validateConstructorParams(argIn)) {
      throw new Error('Invalid constructor argument');
    }

    super(...argIn);
  }

  static validateConstructorParams(argIn) {
    return Array.isArray(argIn) && argIn.length > 0 && argIn.every((i) => Number.isInteger(i));
  }

  toString() {
    return `(${this.join(',')})`;
  }

  /**
   * @param {Vector} ve
   * @returns {boolean}
   */
  equals(ve) {
    if (!ve || !(ve instanceof Array)) {
      throw new Error('Not a valid Vector');
    }

    return this.length === ve.length;
  }

  calc(ve, cb) {
    if (this.equals(ve)) {
      const newVector = this.reduce((acc, curr, i) => {
        acc.push(cb(curr, ve[i]));
        return acc;
      }, []);

      return new Vector(newVector);
    } else {
      throw new Error('Both vector must have same length');
    }
  }

  /**
   * @param {Vector} ve
   */
  add(ve) {
    return this.calc(ve, (a, b) => a + b);
  }

  /**
   * @param {Vector} ve
   */
  subtract(ve) {
    return this.calc(ve, (a, b) => a - b);
  }

  /**
   * @param {Vector} ve
   */
  dot(ve) {
    const multipliedVector = this.calc(ve, (a, b) => a * b);
    return multipliedVector.reduce((acc, curr) => acc + curr, 0);
  }

  norm() {
    const sumOfSqrt = this.reduce((acc, curr) => {
      acc += curr ** 2;
      return acc;
    }, 0);

    return Math.sqrt(sumOfSqrt);
  }
}
