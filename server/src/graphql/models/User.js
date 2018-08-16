const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const { appConfig } = require('../../config');
const { AppError } = require('../../utils/error');
class User {
  constructor(opts) {
    this.collectionName = opts.collectionName;
  }

  async login(email, password, ctx) {
    const user = ctx.conn.lowdb
      .get(this.collectionName)
      .find({ email })
      .value();
    let match;

    if (!user) {
      throw new AppError(AppError.USER_NOT_FOUND);
    }

    try {
      match = await bcrypt.compare(password, user.password);
    } catch (error) {
      console.log(error);
      throw new AppError(AppError.SERVER_INTERNAL_ERROR);
    }

    if (!match) {
      throw new AppError(AppError.INVALID_PASSWORD);
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    const token = jwt.sign(
      {
        user: userInfo
      },
      appConfig.JWT_SCERET,
      { expiresIn: appConfig.JWT_EXPIRES }
    );

    userInfo.token = token;
    return userInfo;
  }

  async register(email, name, password, ctx) {
    if (!email) {
      throw new AppError(AppError.EMAIL_IS_REQUIRED);
    }
    if (!password) {
      throw new AppError(AppError.PASSWORD_IS_REQUIRED);
    }
    const saltRounds = 12;
    let user;
    let hashPwd;

    user = await ctx.conn.lowdb
      .get(this.collectionName)
      .find({ email })
      .value();

    if (user) {
      throw new AppError(AppError.EMAIL_ALREADY_EXISTS);
    }

    try {
      hashPwd = await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.log(error);
      throw new AppError(AppError.SERVER_INTERNAL_ERROR);
    }

    user = {
      id: shortid.generate(),
      email,
      name,
      password: hashPwd
    };

    ctx.conn.lowdb
      .get(this.collectionName)
      .push(user)
      .last()
      .write();

    return { id: user.id, email: user.email, name: user.name };
  }
}

exports.User = User;
