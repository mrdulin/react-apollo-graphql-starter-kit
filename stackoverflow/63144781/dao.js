function dao() {
  this.model = require('./model');
}

dao.prototype.getProcess = function () {
  return this.model.getModelProcess();
};
