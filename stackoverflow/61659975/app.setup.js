const App = require('./app').default;

beforeAll(() => {
  global.app = new App();
  global.app.exp.set('test setup', 1);
  console.log('app setup');
});

afterAll(() => {
  console.log('app stop');
});
