const { stopProcessNewRequests } = require('./requestsManager');
const readiness = require('./readiness');

describe('62057531', () => {
  it('should pass', () => {
    const setNotReadyMock = jest.spyOn(readiness, 'setNotReady').mockReturnValueOnce();
    stopProcessNewRequests();
    expect(setNotReadyMock).toBeCalledTimes(1);
  });
});
