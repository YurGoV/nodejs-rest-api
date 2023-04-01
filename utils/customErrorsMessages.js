const customErrorMessage = (message) => {
  if (message.startsWith('E11000')) {
    return { status: 409, message: 'already used' };
  }
  if (message === 'invalid token') {
    return { status: 401, message: 'not authorized' };
  }
  return { status: 500, message: 'internal error' };
};

module.exports = customErrorMessage;
