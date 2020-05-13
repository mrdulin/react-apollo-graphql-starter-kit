module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'enzyme',
  setupFilesAfterEnv: [
    'jest-enzyme',
    './jest.setup.js',
    // '/Users/ldu020/workspace/github.com/mrdulin/react-apollo-graphql-starter-kit/stackoverflow/61659975/app.setup.js',
  ],
  setupFiles: [
    // '/Users/ldu020/workspace/github.com/mrdulin/react-apollo-graphql-starter-kit/stackoverflow/61727628/setup.js',
  ],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  verbose: true,

  // globalSetup:
  //   '/Users/ldu020/workspace/github.com/mrdulin/react-apollo-graphql-starter-kit/stackoverflow/61727628/setup.js',
  // globalTeardown:
  //   '/Users/ldu020/workspace/github.com/mrdulin/react-apollo-graphql-starter-kit/stackoverflow/61727628/teardown.js',
};
