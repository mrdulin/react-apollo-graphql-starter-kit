const connection = require('./connection');

function find() {
  return new Promise((resolve, reject) => {
    const query = 'select * from table';
    connection.query(query, (err, res) => {
      if (err) {
        return reject(new Error('Error'));
      }
      resolve(res);
    });
  });
}

module.exports = { find };
