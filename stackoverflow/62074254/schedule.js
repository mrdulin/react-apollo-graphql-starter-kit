const schedule = async (options) => {
  const authenticate = require('./authenticate');
  const login = await authenticate.authenticate(options);
  const result;
  result = {
    data: 'success'
  };

  return result;
};

exports.schedule = schedule;
