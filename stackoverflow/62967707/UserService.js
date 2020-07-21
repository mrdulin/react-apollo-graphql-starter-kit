class UserService {
  constructor() {
    console.log('initialize UserService');
  }
  hello() {
    console.log('user hello real implementation');
  }
}
module.exports = new UserService();
