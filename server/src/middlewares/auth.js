const jwt = require('jsonwebtoken');
const { appConfig } = require('../config');

function authMiddleware(req, res, next) {
  const { authorization: token } = req.headers;
  try {
    const { user } = jwt.verify(token, appConfig.JWT_SCERET);
    req.user = user;
  } catch (error) {
    console.log(error);
  }
  next();
}

exports.authMiddleware = authMiddleware;
