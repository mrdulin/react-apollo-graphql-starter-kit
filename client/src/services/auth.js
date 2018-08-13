class Auth {
  static instance;

  isAuthenticated = false;

  constructor() {
    if (Auth.instance) return Auth.instance;
    Auth.instance = this;
    const token = localStorage.getItem('jwt');
    this.authenticate(token);
  }

  authenticate(token, cb) {
    if (token) {
      this.isAuthenticated = true;
      localStorage.setItem('jwt', token);
      cb && cb();
    }
  }

  signout() {
    this.isAuthenticated = false;
    localStorage.removeItem('jwt');
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
