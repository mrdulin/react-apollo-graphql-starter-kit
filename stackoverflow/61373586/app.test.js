const request = require('supertest');
const app = require('./app');

function serialise(obj) {
  return Object.keys(obj)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&');
}

describe('Test other /', () => {
  test('POST /example succeeds (200 OK) if checkboxes are ticked', () => {
    const toSend = {
      check: 'Spiderman',
    };
    return request(app).post('/example').send(serialise(toSend)).expect(200);
  });
  test('POST /example succeeds (200 OK) if Identifier is set', () => {
    const toSend = {
      check: 'Spiderman',
    };
    app.set('identifier', 1);
    return request(app).post('/example').send(serialise(toSend)).expect(200);
  });
});
