const customErrorMessage = (message) => {
  if (message.startsWith('E11000')) {
    return { message: 'already used' };
  }
  return message;
};

module.exports = customErrorMessage;
