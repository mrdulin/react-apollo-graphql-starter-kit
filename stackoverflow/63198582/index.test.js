const Config = require('client-config');
const ConfigService = require('./');

jest.mock(
  'client-config',
  () => ({
    CFGBuilder: {
      builder: jest.fn().mockReturnThis(),
      build: jest.fn().mockReturnThis(),
      getProperty: jest.fn(),
    },
  }),
  { virtual: true },
);

describe('testing config service', () => {
  describe('testing get', () => {
    it('should return db.name', () => {
      Config.CFGBuilder.builder()
        .build()
        .getProperty.mockImplementation((key) => 'mykey');
      expect(ConfigService.get('key')).toBe('mykey');
    });
  });
});
