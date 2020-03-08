const express = require('express');

jest.mock('express', () => {
  const express = {
    get: jest.fn(),
  };
  return jest.fn(() => express);
});

describe('60562419', () => {
  it('should send json', () => {
    const mApp = express();
    const mReq = { email: 'example@gmail.com', username: 'jest' };
    const mRes = { json: jest.fn() };
    mApp.get.mockImplementationOnce((route, handler) => {
      handler(mReq, mRes);
    });
    require('./server');
    expect(express).toBeCalled();
    expect(mApp.get).toBeCalledWith('/api/getUser', expect.any(Function));
    expect(mRes.json).toBeCalledWith({ email: 'example@gmail.com', name: 'jest' });
  });
});
