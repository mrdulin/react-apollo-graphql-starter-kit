class Auth {
  public static instance: Auth;

  public user: any;

  constructor() {
    if (Auth.instance) {
      return Auth.instance;
    }
    Auth.instance = this;
    const token = localStorage.getItem('jwt');
    this.authenticate(token);
  }

  public authenticate(user: any, cb?: () => void) {
    if (user) {
      this.user = user;
      localStorage.setItem('jwt', user.token);
      if (cb) {
        cb();
      }
    }
  }

  public signout() {
    this.user = undefined;
    localStorage.removeItem('jwt');
    window.location.replace('#/login');
  }

  public getJwt() {
    const jwt = localStorage.getItem('jwt') || '';
    return jwt;
  }
}

const auth = new Auth();

export { auth, Auth };
