const jwt = require('jsonwebtoken');
const { appConfig } = require('../config');
const { AppError } = require('./error');

function auth(context) {
  let token;
  const parts = context.req.headers.authorization.split(' ');

  if (parts.length === 2) {
    const schema = parts[0];
    const credentials = parts[1];

    if (/^Bearer$/i.test(schema)) {
      token = credentials;
    } else {
      throw new Error('credentials_bad_scheme: Format is Authorization: Bearer [token]');
    }
  }

  try {
    const { user } = jwt.verify(token, appConfig.JWT_SCERET);
    return user;
  } catch (error) {
    console.log(error);
    // throw new Error('authorization failed');
    throw new AppError({ msg: 'authorization failed', code: 1001 });
  }
}

exports.auth = auth;
