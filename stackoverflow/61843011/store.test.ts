import { createStore } from 'redux';

jest.mock('redux', () => {
  const mStore = {
    dispatch: jest.fn(),
  };
  return {
    createStore: jest.fn(() => mStore),
  };
});

describe('store module', () => {
  let storeImp;

  beforeEach(() => {
    storeImp = require('./store');
  });

  it('should create the store', () => {
    expect(createStore).toHaveBeenCalledTimes(1);
  });

  it('should import a valid datastructure', () => {
    const reducer = () => '';
    const mStore = createStore(reducer);

    const data = {
      something: 'data1',
    };
    storeImp.importer(data);
    expect(mStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
