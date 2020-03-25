import * as mod from '.';
const { token } = require('./config');
const axios = require('axios');
const { errorHandler } = require('./errorHandler');

jest.mock('./config', () => {
  const config = require.requireActual('./config');
  return { token: jest.fn(), host: config.host };
});

jest.mock('axios', () => jest.fn());
jest.mock('./errorHandler', () => {
  return { errorHandler: jest.fn() };
});

describe('60823714', () => {
  it('should get books', async () => {
    token.mockResolvedValueOnce('abc');
    axios.mockResolvedValueOnce({ data: { books: [] } });
    const mReq = {};
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await mod.getData(mReq, mRes);
    expect(token).toBeCalled();
    expect(axios).toBeCalledWith({
      method: 'GET',
      url: 'localhost/api/books',
      headers: { Authorization: `abc` },
    });
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({ books: [] });
  });

  it('should handle error', async () => {
    token.mockResolvedValueOnce('abc');
    const mError = new Error('network');
    axios.mockRejectedValueOnce(mError);
    const mReq = {};
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await mod.getData(mReq, mRes);
    expect(token).toBeCalled();
    expect(axios).toBeCalledWith({
      method: 'GET',
      url: 'localhost/api/books',
      headers: { Authorization: `abc` },
    });
    expect(errorHandler).toBeCalledWith('network', mRes);
  });
});
