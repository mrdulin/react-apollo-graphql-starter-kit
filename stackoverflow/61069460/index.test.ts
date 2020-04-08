import { doStuff } from './';

describe('61069460', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should granted', async () => {
    const persistMock = jest.fn().mockResolvedValueOnce(true);
    Object.defineProperty(navigator, 'storage', {
      value: {
        persist: persistMock,
      },
      configurable: true,
    });
    const logSpy = jest.spyOn(console, 'log');
    await doStuff();
    expect(persistMock).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith('Storage is now going to be persistent...', true);
  });

  it('should throw custom error', async () => {
    const mError = new Error('IO');
    const persistMock = jest.fn().mockRejectedValueOnce(mError);
    Object.defineProperty(navigator, 'storage', {
      value: {
        persist: persistMock,
      },
      configurable: true,
    });
    const logSpy = jest.spyOn(console, 'log');
    await expect(doStuff()).rejects.toThrowError('Client did not allow storage to be persistent..IO');
    expect(persistMock).toBeCalledTimes(1);
    expect(logSpy).not.toBeCalled();
  });
});
