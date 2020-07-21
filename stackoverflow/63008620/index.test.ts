import { main } from './';
import firebase from 'firebase';

jest.mock('firebase', () => {
  return { initializeApp: jest.fn(), analytics: jest.fn() };
});

describe('63008620', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should pass', () => {
    main();
    expect(firebase.initializeApp).toBeCalledWith({});
    expect(firebase.analytics).toBeCalledTimes(1);
  });
});
