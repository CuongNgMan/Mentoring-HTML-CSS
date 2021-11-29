const NamedOne = require('./exercise-1');

let instance;
const firstName = 'Jon';
const lastName = 'Doe';

beforeEach(() => {
  instance = new NamedOne(firstName, lastName);
});

afterAll(() => {
  instance = null;
});

describe('Testing NamedOne function', () => {
  it('should be able to create an instance of NamedOne', () => {
    expect(instance).toBeTruthy();
    expect(instance.firstName).toEqual('Jon');
    expect(instance.lastName).toEqual('Doe');
    expect(instance.fullName).toEqual('Jon Doe');
  });

  it('should update fullName with the new firstName', () => {
    instance.firstName = 'Michel';
    expect(instance.fullName).toEqual('Michel Doe');
  });

  it('should update fullName with the new lastName', () => {
    instance.lastName = 'John';
    expect(instance.fullName).toEqual('Jon John');
  });

  describe('with valid update on fullName property', () => {
    it('should change firstName & lastName accordingly', () => {
      instance.fullName = 'Michel Jackson';
      expect(instance.firstName).toEqual('Michel');
      expect(instance.lastName).toEqual('Jackson');
    });
  });

  describe('with an invalid update on fullName property', () => {
    it('should not change firstName & lastName if fullName is falsy', () => {
      instance.fullName = '';
      expect(instance.firstName).toEqual('Jon');
      expect(instance.lastName).toEqual('Doe');
      expect(instance.fullName).toEqual('Jon Doe');

      instance.fullName = null;
      expect(instance.firstName).toEqual('Jon');
      expect(instance.lastName).toEqual('Doe');
      expect(instance.fullName).toEqual('Jon Doe');

      instance.fullName = undefined;
      expect(instance.firstName).toEqual('Jon');
      expect(instance.lastName).toEqual('Doe');
      expect(instance.fullName).toEqual('Jon Doe');
    });

    it('should not change firstName & lastName if fullName is not space seperated', () => {
      instance.fullName = 'MichelJackson';
      expect(instance.firstName).toEqual('Jon');
      expect(instance.lastName).toEqual('Doe');
      expect(instance.fullName).toEqual('Jon Doe');
    });
  });
});
