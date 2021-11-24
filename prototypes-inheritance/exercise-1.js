// Sample code from the exercise
export function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.introduce = function () {
  return 'My name is ' + this.name + ' and I am ' + this.age;
};

export function myNew(cons, ...args) {
  try {
    return new cons(...args);
  } catch (error) {
    throw new Error('Not a valid constructor');
  }
}
