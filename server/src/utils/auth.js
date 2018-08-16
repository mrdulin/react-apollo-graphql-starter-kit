const jwt = require('jsonwebtoken');
const { appConfig } = require('../config');
const { AppError } = require('./error');

function auth(context) {
  let req;
  if (context.headers) {
    req = context;
  } else {
    req = context.req;
  }
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError({ msg: 'authorization failed', code: 1001 });
  }
  let token;
  const parts = authorization.split(' ');

  if (parts.length === 2) {
    const schema = parts[0];
    const credentials = parts[1];

    if (/^Bearer$/i.test(schema)) {
      token = credentials;
    } else {
      throw new AppError({ msg: 'credentials_bad_scheme: Format is Authorization: Bearer [token]', code: 1002 });
    }
  }

  try {
    const { user } = jwt.verify(token, appConfig.JWT_SCERET);
    return user;
  } catch (error) {
    console.log(error);
    throw new AppError({ msg: 'authorization failed', code: 1001 });
  }
}

function bypassAuth(req) {
  const { authorization } = req.headers;
  if (authorization) {
    let token;
    const parts = authorization.split(' ');

    if (parts.length === 2) {
      const schema = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(schema)) {
        token = credentials;
      } else {
        console.error('credentials_bad_scheme: Format is Authorization: Bearer [token]');
      }
    }

    try {
      const { user } = jwt.verify(token, appConfig.JWT_SCERET);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

exports.auth = auth;
exports.bypassAuth = bypassAuth;
