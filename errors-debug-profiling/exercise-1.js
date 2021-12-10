class CustomError extends Error {
  constructor(type, message, error) {
    super(message);
    this.code = type;

    if (error && error.stack) {
      let trace = '';
      const errorArr = this.stack.split('\n');
      trace += errorArr[0];
      trace += `\n${errorArr[1]}`;
      trace += `\n${error.stack}`;
      this.stack = trace;
    }
  }
}

// Sample errors
const validationError = new CustomError('ValidationError', 'invalid input', new Error('First name must be string'));
const unknownError = new CustomError('UnknownError', 'major error', new Error('unknown error'));

try {
  throw new CustomError('InternalError', 'internal error', unknownError);
} catch (error) {
  console.log('Error message:', error.message);
  console.log('Error code:', error.code);
  console.log('Stack trace:', error.stack);
}
