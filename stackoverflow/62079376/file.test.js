const file = require('./file');

describe('62079376', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should request', () => {
    jest.spyOn(file, 'realClientRequestWay').mockImplementationOnce();
    const mCallback = jest.fn();
    file.handleRequest({ type: 'REAL_CLIENT_REQUEST' }, mCallback);
    expect(file.realClientRequestWay).toBeCalledWith({ type: 'REAL_CLIENT_REQUEST' }, mCallback);
  });

  it('should do nothing if type not match', () => {
    jest.spyOn(file, 'realClientRequestWay').mockImplementationOnce();
    const mCallback = jest.fn();
    file.handleRequest({ type: '' }, mCallback);
    expect(file.realClientRequestWay).not.toBeCalled();
  });
});
