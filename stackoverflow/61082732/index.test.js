const { deleteFile } = require('./');
const fs = require('fs');

jest.mock('fs', () => {
  const mFs = { unlink: jest.fn() };
  return mFs;
});

describe('61082732', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should unlink file', () => {
    fs.unlink.mockImplementationOnce((filename, callback) => {
      callback(null);
    });
    const logSpy = jest.spyOn(console, 'log');
    const filename = 'avatar.jpg';
    deleteFile(filename);
    expect(fs.unlink).toBeCalledWith(filename, expect.any(Function));
    expect(logSpy).toBeCalledWith('file was deleted.');
  });

  it('should throw an error', () => {
    const mError = new Error('not found');
    fs.unlink.mockImplementationOnce((filename, callback) => {
      callback(mError);
    });
    const logSpy = jest.spyOn(console, 'log');
    const filename = 'avatar.jpg';
    expect(() => deleteFile(filename)).toThrowError(mError);
    expect(fs.unlink).toBeCalledWith(filename, expect.any(Function));
    expect(logSpy).not.toBeCalled();
  });
});
