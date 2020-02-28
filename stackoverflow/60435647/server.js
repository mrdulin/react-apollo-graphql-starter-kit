const http = require('http');
const server = http.createServer();

server.listen(8080, '127.0.0.1').on('error', (err) => {
  console.log(err);
});

module.exports = server;
