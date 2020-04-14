import { getRequest } from './';
import request from 'request';

jest.mock('request', () => {
  return {
    get: jest.fn().mockReturnThis(),
    query: jest.fn(),
  };
});

describe('61203251', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should get response', async () => {
    const mResponse = { name: 'elsa' };
    request.get().query.mockResolvedValueOnce(mResponse);
    const api = 'http://localhost:3000';
    const queryParams = { id: '1' };
    const actual = await getRequest(api, queryParams);
    expect(actual).toEqual(mResponse);
    expect(request.get).toBeCalledWith(api);
    expect(request.get().query).toBeCalledWith(queryParams);
  });
  it('should handle error', async () => {
    const mError = new Error('network');
    request.get().query.mockRejectedValueOnce(mError);
    const api = 'http://localhost:3000';
    const queryParams = { id: '1' };
    await expect(getRequest(api, queryParams)).rejects.toThrow(mError);
    expect(request.get).toBeCalledWith(api);
    expect(request.get().query).toBeCalledWith(queryParams);
  });
});
