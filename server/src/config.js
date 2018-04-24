const credential = {
  cnodejs: {
    accessToken: '426634ce-c482-43d7-a1d6-5271b180a510'
  }
};

const appConfig = {
  PORT: process.env.NODE_ENV || 3000
};

exports.appConfig = appConfig;
exports.credential = credential;
