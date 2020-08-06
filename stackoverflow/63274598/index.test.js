const { setEnterpriseCookie } = require('./');

describe('63274598', () => {
  describe('Tests for the page-specific-methods.js file', () => {
    test('Test the page path detecting the enterprise string', () => {
      Object.defineProperty(window, 'location', {
        value: { pathname: '/enterprise/contact' },
      });
      Object.defineProperty(window, 'TOOL', {
        value: {
          cookie: {
            setCookie: jest.fn(),
          },
        },
      });
      setEnterpriseCookie('123');

      expect(window.TOOL.cookie.setCookie).toBeCalledTimes(1);
      expect(window.TOOL.cookie.setCookie).toHaveBeenLastCalledWith('123');
    });
  });
});
