import request from 'supertest';

jest.mock('express-request-proxy', () => (data) => (req, res, next) => res.json(data), { virtual: true });

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

describe('GET /', () => {
  it('should get all stuff', () => {
    jest.doMock('./config', () => ({}));
    const router = require('./index').default;
    const app = require('express')();
    app.use(router);

    return request(app)
      .get('')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toMatchSnapshot();
      });
  });

  it('should get all stuff when FOO=bar', async () => {
    jest.doMock('./config', () => ({
      default: {
        FOO: 'bar',
        get: (key) => key,
      },
      __esModule: true,
    }));
    const router = require('./index').default;
    const app = require('express')();
    app.use(router);

    await request(app)
      .get('')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.query).toHaveProperty('baz');
      });
  });
});
