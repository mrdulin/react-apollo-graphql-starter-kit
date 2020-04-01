import { main } from './';

describe('60959971', () => {
  it('should pass', () => {
    const location = {
      ...window.location,
      search: '?productId=1234',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });
    const actual = main();
    expect(actual).toBe('1234');
  });
});
