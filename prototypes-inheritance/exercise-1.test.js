import { myNew, Person } from './exercise-1';

const invalidConstructorError = new Error('Not a valid constructor');

describe('Testing myNew factory function', () => {
  it('should throw error if an invalid constructor is passed', () => {
    try {
      myNew(null, 1, 2, 3);
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error.message).toEqual(invalidConstructorError.message);
    }
  });

  it('should behave as the new keyword', () => {
    const john = myNew(Person, 'John', 30);

    expect(john instanceof Person).toEqual(true);
    expect(john.name).toEqual('John');
    expect(john.age).toEqual(30);
    expect(john.introduce()).toEqual('My name is John and I am 30');
  });
});
