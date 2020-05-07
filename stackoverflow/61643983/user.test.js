import * as API from './api';
import * as User from './user';

jest.mock('./api', () => {
  const auth = { Login: jest.fn() };
  return {
    Auth: jest.fn(() => auth),
  };
});

describe('61643983', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should login', () => {
    expect.assertions(2);

    return User.LoginRequestHandler().then(() => {
      expect(API.Auth).toBeCalledTimes(1);
      expect(API.Auth().Login).toHaveBeenLastCalledWith('theUsername', 'thePassword');
    });
  });

  it('should throw error', () => {
    expect.assertions(4);
    const mError = new Error('user not found');
    API.Auth().Login.mockRejectedValueOnce(mError);

    return User.LoginRequestHandler().catch((e) => {
      expect(API.Auth).toBeCalled();
      expect(API.Auth().Login).toHaveBeenLastCalledWith('theUsername', 'thePassword');
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toMatch(/user not found/);
    });
  });
});
