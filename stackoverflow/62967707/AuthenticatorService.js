const userService = require('./UserService');

class AuthenticatorService {
  constructor() {
    console.log('initialize AuthenticatorService');
  }
  hello() {
    userService.hello();
  }
}

module.exports = new AuthenticatorService();
