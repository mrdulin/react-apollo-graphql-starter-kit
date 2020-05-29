const readiness = require('./readiness');

function stopProcessNewRequests() {
  readiness.setNotReady();
}

module.exports = { stopProcessNewRequests };
