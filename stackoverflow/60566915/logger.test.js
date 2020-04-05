jest.mock('winston');
const winston = require('winston');

let mockJson;
let mockColorize;
let mockSimple;
let mockCombine;
let mockConsole;
let mockTransports;
let mockFormat;

beforeEach(() => {
  mockJson = jest.fn(() => 'mock json');
  mockColorize = jest.fn(() => 'mock colorize');
  mockSimple = jest.fn(() => 'mock simple');
  mockCombine = jest.fn();
  mockConsole = jest.fn();
  mockTransports = {
    Console: mockConsole,
  };
  mockFormat = {
    json: mockJson,
    colorize: mockColorize,
    combine: mockCombine,
    simple: mockSimple,
  };
  winston.format = mockFormat;
  winston.transports = mockTransports;
  winston.createLogger.mockImplementation(() => ({ info: jest.fn() }));

  require('./logger');
});

test('default behavior', () => {
  expect(mockTransports.Console).toHaveBeenCalledTimes(1);
  expect(mockFormat.json).toHaveBeenCalledTimes(1);
  expect(mockFormat.colorize).toHaveBeenCalledTimes(1);
  expect(mockFormat.simple).toHaveBeenCalledTimes(1);
  expect(mockFormat.combine).toHaveBeenCalledTimes(1);
  expect(mockFormat.combine).toHaveBeenCalledWith('mock json', 'mock colorize', 'mock simple');
});

test('default behavior with production env', () => {
  process.env.NODE_ENV = 'production';

  expect(winston.createLogger).toHaveBeenCalledTimes(1);
});

test('default behavior with development env', () => {
  process.env.NODE_ENV = 'development';

  expect(winston.createLogger).toHaveBeenCalledTimes(1);
});
