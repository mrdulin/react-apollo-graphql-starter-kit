const dao = require('./dao');

exports.callDAOProcess = () => {
  const result = new dao().getProcess();
  return result;
};
