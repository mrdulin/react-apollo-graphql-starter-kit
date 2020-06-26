const functions = require('./functions.js');

test('test if secondFunc is called', () => {
  const mockFunction = jest.fn();
  functions.secondFunc = mockFunction;
  functions.firstFunc();
  expect(mockFunction).toHaveBeenCalled();
});
