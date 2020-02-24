// import { foo } from './my-module';
// import minimatch from 'minimatch';

// jest.mock('minimatch', () => jest.fn());

describe('minimatch', () => {
  it('should call minimatch', () => {
    jest.doMock('minimatch', () => jest.fn());
    const { foo } = require('./my-module');
    const minimatch = require('minimatch');
    foo('*', 'hello');
    expect(minimatch).toHaveBeenCalled();
  });
});
