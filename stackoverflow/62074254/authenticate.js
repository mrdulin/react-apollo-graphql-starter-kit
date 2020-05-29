const got = require('got');

const authenticate = async (options) => {
  let res = 'got';
  return { data: res.access_token };
};

exports.authenticate = authenticate;
