/* istanbul ignore file */
const mysql = require('mysql');

let pool;
const config = require('./config.js');

const connection = getPool();
/**
 * Singleton pool connection
 * @return {Pool} the pool connection
 */
function getPool() {
  if (pool) {
    return pool;
  }
  pool = mysql.createPool(config);
  return pool;
}

module.exports = connection;
