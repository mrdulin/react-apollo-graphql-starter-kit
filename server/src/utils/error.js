class AppError extends Error {
  constructor(opts) {
    super(opts.msg);
    this.code = opts.code;
  }
}

exports.AppError = AppError;
