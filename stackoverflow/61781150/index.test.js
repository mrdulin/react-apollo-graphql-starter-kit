const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

describe('61781150', () => {
  it('should pass', () => {
    expect(process.env.USER_ENDPOINT).toBe('http://localhost:3000');
    expect(process.env.USER_KEY).toBe('abc123');
  });
});
