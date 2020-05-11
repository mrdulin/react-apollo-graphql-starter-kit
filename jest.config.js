module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'enzyme',
  setupFilesAfterEnv: [
    'jest-enzyme',
    './jest.setup.js',
    // '/Users/ldu020/workspace/github.com/mrdulin/react-apollo-graphql-starter-kit/stackoverflow/61659975/app.setup.js',
  ],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  verbose: true,
};
