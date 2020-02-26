import EventSourceSetup from '.';

const mEventSourceInstance = {
  addEventListener: jest.fn(),
};
const mEventSource = jest.fn(() => mEventSourceInstance);

global.EventSource = mEventSource;

describe('SSE', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('first', () => {
    mEventSourceInstance.addEventListener.mockImplementation((event, handler) => {
      if (event === 'loading' || event === 'loaded') {
        handler();
      }
    });
    const logSpy = jest.spyOn(console, 'log');
    new EventSourceSetup();
    expect(mEventSource).toBeCalledWith('http://localhost');
    expect(mEventSourceInstance.addEventListener).toBeCalledTimes(3);
    expect(logSpy).toBeCalledWith('loading');
    expect(logSpy).toBeCalledWith('loaded');
  });

  it('should handle error', () => {
    mEventSourceInstance.addEventListener.mockImplementation((event, handler) => {
      if (event === 'error') {
        handler();
      }
    });
    const logSpy = jest.spyOn(console, 'log');
    new EventSourceSetup();
    expect(mEventSource).toBeCalledWith('http://localhost');
    expect(mEventSourceInstance.addEventListener).toBeCalledTimes(3);
    expect(logSpy).toBeCalledWith('error');
  });

  it('should handle onerror', () => {
    const eventSourceSetup = new EventSourceSetup();
    const errorLogSpy = jest.spyOn(console, 'error');
    const mError = new Error('network');
    eventSourceSetup.eventSource.onerror(mError);
    expect(errorLogSpy).toBeCalledWith('EventSource failed: ', mError);
  });
});
