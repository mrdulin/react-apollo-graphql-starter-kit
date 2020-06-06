import { main } from './';
import { client } from './client';

describe('62214949', () => {
  it('should log correct response', () => {
    const mResponse = 'mocked response';
    const logSpy = jest.spyOn(console, 'log');
    jest.spyOn(client, 'authenticate').mockImplementationOnce((request, meta, callback) => {
      console.log('mocked implementation');
      callback(null, mResponse);
    });
    main();
    expect(logSpy).toBeCalledWith('REPLY FROM SERVER: ', 'mocked response');
    expect(client.authenticate).toBeCalledWith({}, {}, expect.any(Function));
  });

  it('should handle error', () => {
    const mError = new Error('network');
    const logSpy = jest.spyOn(console, 'error');
    jest.spyOn(client, 'authenticate').mockImplementationOnce((request, meta, callback) => {
      console.log('mocked implementation');
      callback(mError);
    });
    main();
    expect(logSpy).toBeCalledWith(mError);
    expect(client.authenticate).toBeCalledWith({}, {}, expect.any(Function));
  });
});
