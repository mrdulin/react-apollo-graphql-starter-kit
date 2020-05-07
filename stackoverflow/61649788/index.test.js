const getPositions = require('./');
const mockLibrary = require('./library');

jest.mock('./library', () => {
  const mockExchange = { someFunction: jest.fn() };
  return { exchange_name: jest.fn(() => mockExchange) };
});

describe('61649788', () => {
  it('get balances', async () => {
    const mockExchange = new mockLibrary.exchange_name();
    mockExchange.someFunction.mockResolvedValueOnce({ data: ['mocked data'] });
    const actual = await getPositions();
    expect(actual).toEqual({ data: ['mocked data'] });
    expect(mockExchange.someFunction).toBeCalled();
  });
});
