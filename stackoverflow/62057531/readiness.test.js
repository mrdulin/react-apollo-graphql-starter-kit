const { setNotReady, setReady } = require('./readiness');
const hooks = require('./hooks');
const state = require('./state');

describe('62057531', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should set state to not ready', () => {
    jest.spyOn(hooks, 'notifyHook').mockReturnValueOnce();
    setNotReady();
    expect(hooks.notifyHook).toBeCalledWith(false);
    expect(state.ready).toBeFalsy();
  });

  it('should set state to ready', () => {
    jest.spyOn(hooks, 'notifyHook').mockReturnValueOnce();
    setReady();
    expect(hooks.notifyHook).toBeCalledWith(true);
    expect(state.ready).toBeTruthy();
  });
});
