const asyncHandlerUtil = require('./asyncHandlerUtil');

describe('62063369', () => {
  it('should pass', async () => {
    const mFn = jest.fn().mockResolvedValueOnce('mocked value');
    const mReq = {};
    const mRes = {};
    const mNext = jest.fn();
    const got = await asyncHandlerUtil(mFn)(mReq, mRes, mNext);
    expect(got).toBe('mocked value');
    expect(mFn).toBeCalledWith({}, {}, mNext);
  });
});
