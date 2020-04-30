const app = require('./app');
const request = require('supertest');
const A = require('./a');

jest.mock('./a', () => {
  const mA = { myFunc: jest.fn() };
  return jest.fn(() => mA);
});

describe('61505692', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should pass', () => {
    const mA = new A();
    mA.myFunc.mockResolvedValueOnce('fake result');
    return request(app)
      .get('/')
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
