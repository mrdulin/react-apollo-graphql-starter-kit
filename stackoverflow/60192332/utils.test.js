const main = require('./utils');
const someModule = require('someModule');

jest.mock(
  'someModule',
  () => {
    return { setKey: jest.fn() };
  },
  { virtual: true },
);

describe('60192332', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set key', () => {
    main();
    expect(someModule.setKey.mock.calls).toHaveLength(1);
  });
});
