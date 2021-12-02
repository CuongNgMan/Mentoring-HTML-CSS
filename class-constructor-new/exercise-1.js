
export class Vector extends Array {
  constructor(argIn) {
    if (!Vector.validateConstructorParams(argIn)) {
      throw new Error('Invalid constructor argument');
    }

    super(...argIn)
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
    return this.isHavingSameLength(ve) && this.every((c, i) => c === ve[i])
  }

  /**
   * @param {Vector} ve
   * @param {Function} cb
   * @returns {Vector}
   */
  calc(ve, cb) {
    if (this.isHavingSameLength(ve)) {
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
  isHavingSameLength(ve) {
    return this.isValidVector(ve) && this.length === ve.length
  }

  /**
   *
   * @param {Vector} ve
   */
  isValidVector(ve) {
    if (!ve || !(ve instanceof Array)) {
      throw new Error('Not a valid Vector');
    }
    return true;
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

  scaleBy(number) {
    return new Vector(Array.from(this).map(i => i * number))
  }
}



const vector = new Vector([2, 3, 4])
const vector2 = new Vector(vector)

const vector3 = new Vector([-2,3,4])
console.log(vector.equals(vector3))
