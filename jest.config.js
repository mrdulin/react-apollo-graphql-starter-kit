module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'enzyme',
  setupFilesAfterEnv: ['jest-enzyme', './jest.setup.js'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  verbose: true,
};
