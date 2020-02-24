const createUser = require('./');
const db = require('./db/client');

jest.mock('./db/client', () => {
  const mKnex = { count: jest.fn() };
  return jest.fn(() => mKnex);
});

describe('60357935', () => {
  it('should count user', async () => {
    const mData = [{ count: 10 }];
    db().count.mockResolvedValueOnce(mData);
    const actual = await createUser();
    expect(actual).toBe(10);
  });

  it('should handle error', async () => {
    const mError = new Error('network');
    db().count.mockRejectedValueOnce(mError);
    const actual = await createUser();
    expect(actual).toBeNull();
  });
});
