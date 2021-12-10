class CustomError extends Error {
  constructor(type, ...args) {
    super(...args);

    this.code = type;
  }
}

try {
  throw new CustomError('InternalError', 'internal error');
} catch (error) {
  console.log('Error message: ', error.message);
  console.log('Error code: ', error.code);
  console.log('Stack trace:', error.stack);
}
