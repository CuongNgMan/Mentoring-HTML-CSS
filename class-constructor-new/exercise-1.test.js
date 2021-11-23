import { expectCt } from 'helmet';
import { Vector } from './exercise-1';

let v1;
let v2;
let v3;

const invalidConstructError = new Error('Invalid constructor argument');
const invalidVector = new Error('Not a valid Vector');
const differentVectorLengthError = new Error('Both vector must have same length');

beforeEach(() => {
  v1 = new Vector([1, 2, 3]);
  v2 = new Vector([3, 4, 5]);
  v3 = new Vector([5, 6, 7, 8]);
});

afterAll(() => {
  v1 = null;
  v2 = null;
  v3 = null;
});

describe('Testing Vector', () => {
  describe('Construction', () => {
    describe('With a valid construct input', () => {
      it('should create an instance of Vector', () => {
        expect(v1).toBeTruthy();
        expect(v1 instanceof Array).toBeTruthy();
      });
    });
    describe('With an invalid construct input', () => {
      it('should throw error if input is not an array', () => {
        try {
          new Vector(null);
          expect(false).toBeTruthy();
        } catch (error) {
          expect(error.message).toEqual(invalidConstructError.message);
        }
      });
      it('should throw error if input array is empty', () => {
        try {
          new Vector([]);
          expect(false).toBeTruthy();
        } catch (error) {
          expect(error.message).toEqual(invalidConstructError.message);
        }
      });
      it('should throw error if input array is contain non-number value', () => {
        try {
          new Vector([1, 2, 3, undefined]);
          expect(false).toBeTruthy();
        } catch (error) {
          expect(error.message).toEqual(invalidConstructError.message);
        }
      });
    });
  });

  describe('Functionality', () => {
    describe('with 2 vector having the same length', () => {
      it('should be able to add 2 vector', () => {
        const result = v1.add(v2);
        expect(result).toEqual([4, 6, 8]);
      });
      it('should be able to subtract 2 vector', () => {
        const result = v1.subtract(v2);
        expect(result).toEqual([-2, -2, -2]);
      });
      it('should be able to multiply 2 vector', () => {
        const result = v1.dot(v2);
        expect(result).toEqual(26);
      });
      it('should be able to calculate the norm of vector', () => {
        const result = v1.norm();
        expect(result).toEqual(3.7416573867739413);
      });
    });
    describe('with 2 vector having different length', () => {
      it('should throw error on adding 2 vector', () => {
        try {
          v1.add(v3);
          expect(false).toBeTruthy();
        } catch (error) {
          expect(error.message).toEqual(differentVectorLengthError.message);
        }
      });
      it('should throw error on subtracting 2 vector', () => {
        try {
          v1.subtract(v3);
          expect(false).toBeTruthy();
        } catch (error) {
          expect(error.message).toEqual(differentVectorLengthError.message);
        }
      });
      it('should throw error on multiplying 2 vector', () => {
        try {
          v1.dot(v3);
          expect(false).toBeTruthy();
        } catch (error) {
          expect(error.message).toEqual(differentVectorLengthError.message);
        }
      });
    });

    it('should throw error if compare to an invalid Vector', () => {
      try {
        v1.equals(null);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error.message).toEqual(invalidVector.message);
      }
    });
    it('should return true if 2 vector having the same length', () => {
      expect(v1.equals(v2)).toEqual(true);
    });
    it('should return false if 2 vector having different length', () => {
      expect(v1.equals(v3)).toEqual(false);
    });
    it('should represent vector as string format', () => {
      expect(v1.toString()).toEqual('(1,2,3)');
    });
  });
});
