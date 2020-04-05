const winston = require('winston');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.json(), winston.format.colorize(), winston.format.simple()),
  transports:
    process.env.NODE_ENV === 'production' ? [new winston.transports.Console()] : [new winston.transports.Console()],
});

module.exports = logger;
