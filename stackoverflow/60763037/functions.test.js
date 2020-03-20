const rewire = require('rewire');
const functions = rewire('./functions');

describe('60763037', () => {
  test('a', () => {
    expect(functions.greet()).toBe('hello Monday');
  });

  test('b', () => {
    functions.__set__('state', 'Tuesday');
    expect(functions.greet()).toBe('hello Tuesday');
  });
});
