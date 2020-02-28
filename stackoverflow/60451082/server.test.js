describe('60451082', () => {
  it('should pass', () => {
    const mError = new Error('network');
    const appMock = {
      listen: jest.fn().mockReturnThis(),
      on: jest.fn().mockImplementationOnce((event, handler) => {
        handler(mError);
      }),
    };
    jest.doMock('express', () => jest.fn(() => appMock));
    const logSpy = jest.spyOn(console, 'log');
    const express = require('express');
    require('./server');
    expect(express).toBeCalledTimes(1);
    expect(appMock.listen).toBeCalledWith(8080, '127.0.0.1');
    expect(appMock.on).toBeCalledWith('error', expect.any(Function));
    expect(logSpy).toBeCalledWith(mError);
  });
});
