const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { appConfig } = require('../../config');
const shortid = require('shortid');

class User {
  async login(email, password, ctx) {
    const user = ctx.conn.lowdb
      .get(User.collectionName)
      .find({ email })
      .value();
    let match;

    if (!user) {
      throw new Error('user not found');
    }

    try {
      match = await bcrypt.compare(password, user.password);
    } catch (error) {
      console.log(error);
      throw new Error('server internal error');
    }

    if (!match) {
      throw new Error('invalid password');
    }

    const token = jwt.sign(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      },
      appConfig.JWT_SCERET,
      { expiresIn: appConfig.JWT_EXPIRES }
    );

    return token;
  }

  async register(email, name, password, ctx) {
    if (!email) {
      throw new Error('email is required');
    }
    if (!password) {
      throw new Error('password is required');
    }
    const saltRounds = 12;
    let user;
    let hashPwd;

    user = await ctx.conn.lowdb
      .get(User.collectionName)
      .find({ email })
      .value();

    if (user) {
      throw new Error('email exists');
    }

    try {
      hashPwd = await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.log(error);
      throw new Error('server internal error');
    }

    user = {
      _id: shortid.generate(),
      email,
      name,
      password: hashPwd
    };

    return ctx.conn.lowdb
      .get(User.collectionName)
      .push(user)
      .last()
      .write();
  }
}

User.collectionName = 'users';

exports.User = User;
