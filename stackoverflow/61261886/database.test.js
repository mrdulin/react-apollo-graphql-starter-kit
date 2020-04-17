const database = require('./database.js');
const connection = require('./connection.js');

jest.mock('./connection.js');

describe('testing find all', () => {
  test('testing error ', async () => {
    const mError = new Error('network');
    connection.query.mockImplementation((q, cb) => cb(mError, null));
    try {
      await database.find();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
