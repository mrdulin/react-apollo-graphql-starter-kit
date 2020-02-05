import { main } from './';
import { handleError } from './errorHandler';

jest.mock('./errorHandler', () => {
  return { handleError: jest.fn() };
});

describe('60062574', () => {
  beforeEach(() => {
    global.navigator = { geolocation: { getCurrentPosition: jest.fn() } };
  });
  it('should handle error', () => {
    const mError = new Error('some error');
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((successCallback, errorCallback) => {
      errorCallback(mError);
    });
    main();
    expect(navigator.geolocation.getCurrentPosition).toBeCalledWith(expect.any(Function), expect.any(Function));
    expect(handleError).toBeCalledWith(mError);
  });

  it('should handle success', () => {
    const logSpy = jest.spyOn(console, 'log');
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((successCallback, errorCallback) => {
      successCallback();
    });
    main();
    expect(logSpy).toBeCalledWith('success');
    expect(navigator.geolocation.getCurrentPosition).toBeCalledWith(expect.any(Function), expect.any(Function));
  });
});
