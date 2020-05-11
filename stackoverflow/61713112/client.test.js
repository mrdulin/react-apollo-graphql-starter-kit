import { logIn } from './client';
import createApiClientMock from './createApiClient';

jest.mock('./createApiClient', () => {
  const axiosInstance = { post: jest.fn() };
  return jest.fn(() => axiosInstance);
});

describe('61713112', () => {
  it('should pass', async () => {
    const axiosInstanceMock = createApiClientMock();
    const mResponse = { token: 'token' };
    axiosInstanceMock.post.mockResolvedValueOnce(mResponse);
    const actual = await logIn('foo', 'qwerty');
    expect(actual).toEqual('token');
    expect(axiosInstanceMock.post).toBeCalledWith('login/', { username: 'foo', password: 'qwerty' });
  });
});
