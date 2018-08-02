const jwt = require('jsonwebtoken');
const { appConfig } = require('../config');

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
    throw new Error('authorization failed');
  }
}

exports.auth = auth;
