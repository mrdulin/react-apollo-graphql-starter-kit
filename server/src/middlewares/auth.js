const jwt = require('jsonwebtoken');
const { appConfig } = require('../config');
// const { sendJson } = require('../utils/sendJson');

function authMiddleware(req, res, next) {
  let token;
  const parts = req.headers.authorization.split(' ');

  if (parts.length === 2) {
    const schema = parts[0];
    const credentials = parts[1];

    if (/^Bearer$/i.test(schema)) {
      token = credentials;
    } else {
      // return sendJson(
      //   {
      //     code: 1002,
      //     msg: 'credentials_bad_scheme: Format is Authorization: Bearer [token]'
      //   },
      //   res
      // );
      // throw new Error('credentials_bad_scheme: Format is Authorization: Bearer [token]');

      console.log('credentials_bad_scheme: Format is Authorization: Bearer [token]');
    }
  }

  if (!token) {
    console.log('credentials_required: No authorization token was found');
  }

  try {
    const { user } = jwt.verify(token, appConfig.JWT_SCERET);
    req.user = user;
  } catch (error) {
    // 用户未登录时，将永远在此被拦截
    // return sendJson(
    //   401,
    //   {
    //     code: 1001,
    //     msg: 'Authorization failed'
    //   },
    //   res
    // );

    // 同上
    // throw new Error(error.message);

    // 仅打印错误，中间件会继续往下执行到graphql中间件
    console.log(error);
  }
  next();
}

exports.authMiddleware = authMiddleware;
