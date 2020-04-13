import { main } from '.';

const mLocalStorage = {
  _storage: {},
  getItem: jest.fn((key) => {
    return mLocalStorage._storage[key];
  }),
  setItem: jest.fn((key, value) => {
    mLocalStorage._storage[key] = value;
  }),
};
Object.defineProperty(window, 'localStorage', {
  value: mLocalStorage,
});

describe('61142462', () => {
  it('should save data into local storage', () => {
    let rval;
    jest.spyOn(window, 'addEventListener').mockImplementationOnce((event, handler, options) => {
      const gen = handler({ data: { action: 'authentication', access: '123', refresh: 'abc' } });
      rval = gen.next().value;
    });
    main();
    expect(rval).toBe('dispatch action');
    expect(window.addEventListener).toBeCalledWith('message', expect.any(Function), false);
    expect(mLocalStorage.setItem).toBeCalledWith('dualbits:access', '123');
    expect(mLocalStorage.setItem).toBeCalledWith('dualbits:refresh', 'abc');
  });

  it('should not save data into local storage', () => {
    let rval;
    jest.spyOn(window, 'addEventListener').mockImplementationOnce((event, handler, options) => {
      const gen = handler({ data: undefined });
      rval = gen.next().value;
    });
    // You can do the rest of part of this test case
  });
});
