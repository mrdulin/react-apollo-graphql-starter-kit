const Config = require('client-config');
const cfgM = Config.CFGBuilder.builder().build();

class ConfigService {
  static get(key) {
    return cfgM.getProperty(key);
  }
}

module.exports = ConfigService;
