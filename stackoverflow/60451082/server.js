const express = require('express');
const app = express();

const server = app.listen(8080, '127.0.0.1').on('error', (err) => {
  console.log(err);
});

module.exports = server;
