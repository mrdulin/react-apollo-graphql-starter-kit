const db = require('./db/client');

const createUser = async () => {
  return db('users')
    .count()
    .then((data) => {
      return data[0].count;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

module.exports = createUser;
