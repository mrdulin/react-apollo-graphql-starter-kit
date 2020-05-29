const log = { trace: console.log };
const REAL_CLIENT_REQUEST = 'REAL_CLIENT_REQUEST';

function handleRequest(grpcRequestObj, callback) {
  const refId = '1';
  if (grpcRequestObj.type === REAL_CLIENT_REQUEST) {
    log.trace('Запрос от реального клиента', refId);
    module.exports.realClientRequestWay(grpcRequestObj, callback);
    return;
  }
}
function realClientRequestWay(grpcRequestObj, callback) {
  //some logic
}

module.exports = {
  handleRequest,
  realClientRequestWay,
};
