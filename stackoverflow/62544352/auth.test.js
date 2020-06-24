const { getKey } = require('./auth');
const jwksClient = require('./jwks');

jest.mock('./jwks', () => {
  return { getSigningKey: jest.fn() };
});

describe('62544352', () => {
  it('should pass', () => {
    jwksClient.getSigningKey.mockImplementationOnce((key, callback) => {
      const key = { publicKey: 'publicKey' };
      callback(null, key);
    });
    const mCallback = jest.fn();
    getKey({ kid: 'someKey' }, mCallback);
    expect(jwksClient.getSigningKey).toBeCalledWith('someKey', expect.any(Function));
    expect(mCallback).toBeCalledWith(null, 'publicKey');
  });
});
