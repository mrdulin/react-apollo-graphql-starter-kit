const mongoose = require('mongoose');

async function MongoConnect(uris, ConnectionOptions) {
  let conn;
  try {
    conn = mongoose.connect(
      uris,
      ConnectionOptions
    );
    console.log('Connect mongodb successfully');
  } catch (error) {
    console.log('Connect mongodb failed');
  }

  return conn;
}

module.exports = {
  MongoConnect
};
