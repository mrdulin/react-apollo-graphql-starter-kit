class AppError extends Error {
  constructor(opts) {
    super(opts.msg);
    this.code = opts.code;
  }
}

Object.assign(AppError, {
  Unauthorized: { code: 1001, msg: 'Unauthorized' },
  USER_NOT_FOUND: { code: 1002, msg: 'User not found' },
  INVALID_PASSWORD: { code: 1003, msg: 'Invalid password' },
  EMAIL_IS_REQUIRED: { code: 1004, msg: 'Email is required' },
  PASSWORD_IS_REQUIRED: { code: 1005, msg: 'Password is required' },
  EMAIL_ALREADY_EXISTS: { code: 1006, msg: 'Email already exists' },

  SERVER_INTERNAL_ERROR: { code: 9999, msg: 'Server internal error' }
});

exports.AppError = AppError;
