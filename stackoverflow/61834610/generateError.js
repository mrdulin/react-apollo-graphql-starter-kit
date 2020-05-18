function generateError(status, message) {
  return new Error(message);
}

module.exports = generateError;
