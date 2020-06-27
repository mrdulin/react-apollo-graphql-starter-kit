import UserRepoImpl from './userRepoImpl';

describe('62603645', () => {
  it('should pass', async () => {
    const mUser = { name: 'wen' };
    const mEsClient = { request: jest.fn().mockResolvedValueOnce({ _source: mUser }) };
    const userRepoImpl = new UserRepoImpl(mEsClient);
    const actual = await userRepoImpl.getUser('1');
    expect(actual).toEqual(mUser);
    expect(mEsClient.request).toBeCalledWith('GET', '/users/_doc/1');
  });
});
