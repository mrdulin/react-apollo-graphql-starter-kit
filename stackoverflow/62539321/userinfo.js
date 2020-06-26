const database = require('./database');

const getuserdata = async function (req, res, next) {
  let userinfo = await exports.getUserInfo();
  return userinfo;
};

const getUserInfo = async function (req, res, next) {
  const records = await database.query('select * from users');
  return records;
};

exports.getuserdata = getuserdata;
exports.getUserInfo = getUserInfo;
