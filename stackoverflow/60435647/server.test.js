const http = require('http');

describe('60435647', () => {
  it('should handle error', () => {
    const mError = new Error('network');
    const mServer = {
      listen: jest.fn().mockReturnThis(),
      on: jest.fn().mockImplementationOnce((event, handler) => {
        handler(mError);
      }),
    };
    const createServerSpy = jest.spyOn(http, 'createServer').mockImplementationOnce(() => mServer);
    const logSpy = jest.spyOn(console, 'log');
    require('./server');
    expect(createServerSpy).toBeCalledTimes(1);
    expect(mServer.listen).toBeCalledWith(8080, '127.0.0.1');
    expect(mServer.on).toBeCalledWith('error', expect.any(Function));
    expect(logSpy).toBeCalledWith(mError);
  });
});
