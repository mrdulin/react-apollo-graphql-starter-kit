const scheduler = require('./schedule');

jest.mock('./authenticate', () => ({
  authenticate: jest.fn(),
}));

describe('62074254', () => {
  test('[schedule]', async () => {
    const authenticate = require('./authenticate');
    const mockOptions = { access_token: '123' };

    authenticate.authenticate.mockReturnValue({
      data: mockOptions.access_token,
    });
    const options = {};
    const moduleUnderTest = await scheduler.schedule(options);

    expect(moduleUnderTest).toEqual({ data: 'success' });
    expect(authenticate.authenticate).toBeCalledWith({});
  });
});
