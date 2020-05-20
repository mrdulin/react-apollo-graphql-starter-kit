const myClass = require('./myClass');

describe('61902581', () => {
  test('test one', () => {
    jest.useFakeTimers();
    const logSpy = jest.spyOn(console, 'log');
    myClass.functionOne();
    jest.advanceTimersByTime(5000);
    expect(logSpy).toBeCalledWith('Name: John Smith, age: 10');
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 5000);

    jest.clearAllTimers();
    logSpy.mockRestore();
  });
});
