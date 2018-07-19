const rp = require('../../utils/http');

class CNodeConnector {
  constructor(options) {
    this.API_ROOT_URL = options.API_ROOT_URL || '';
    this.http = rp({
      url: this.API_ROOT_URL
    });
  }

  post(api, body) {
    return this.http.post(api, body);
  }

  get(api, qs) {
    return this.http.get(api, qs);
  }
}

exports.CNodeConnector = CNodeConnector;
