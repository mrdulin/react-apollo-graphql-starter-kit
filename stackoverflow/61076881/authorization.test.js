const rewire = require('rewire');

describe('61076881', () => {
  it('should get user', async () => {
    const authorization = rewire('./authorization');
    const mClient = { getUser: jest.fn().mockReturnValueOnce('fake user') };
    const mCreateClient = jest.fn(() => mClient);
    authorization.__set__('createClient', mCreateClient);
    const options = { req: { user: { access_token: '123' } } };
    const authorizationMiddleware = authorization(options);
    const user = await authorizationMiddleware();
    expect(user).toEqual('fake user');
    expect(mCreateClient).toBeCalledWith(options.req);
    expect(mClient.getUser).toBeCalledTimes(1);
  });
});
