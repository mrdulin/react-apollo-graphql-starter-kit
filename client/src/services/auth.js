class Auth {
  static instance;

  user;

  constructor() {
    if (Auth.instance) return Auth.instance;
    Auth.instance = this;
    const token = localStorage.getItem('jwt');
    this.authenticate(token);
  }

  authenticate(user, cb) {
    if (user) {
      this.user = user;
      localStorage.setItem('jwt', user.token);
      cb && cb();
    }
  }

  signout() {
    this.user = undefined;
    localStorage.removeItem('jwt');
    window.location.replace('#/login');
  }

  getJwt() {
    const jwt = localStorage.getItem('jwt') || '';
    return jwt;
  }
}

const auth = new Auth();
const auth2 = new Auth();

console.log(auth === auth2);

export { auth, Auth };
