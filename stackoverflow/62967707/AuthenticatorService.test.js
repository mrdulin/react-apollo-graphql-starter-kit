const authenticatorService = require('./AuthenticatorService');
const userService = require('./UserService');

jest.mock('./UserService', () => {
  return { hello: jest.fn() };
});

describe('62967707', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should pass', () => {
    userService.hello.mockImplementationOnce(() => console.log('user hello mocked implementation'));
    authenticatorService.hello();
    expect(userService.hello).toBeCalledTimes(1);
  });
});
