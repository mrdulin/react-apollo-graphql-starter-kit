const myService = require('./myService');

class UserData {
  getData(query) {
    return new Promise((resolve, reject) => {
      myService.getUserData(query).then((userdata) => {
        myService.getManagerData(userdata).then((managerdata) => {
          resolve(managerdata);
        });
      });
    });
  }
}

module.exports = UserData;
