import addNotification from './notifications';
import { store } from 'react-notifications-component';

jest.mock(
  'react-notifications-component',
  () => {
    const mStore = {
      addNotification: jest.fn(),
    };
    return { store: mStore };
  },
  { virtual: true },
);

describe('61461299', () => {
  it('should pass', () => {
    const title = 'jest';
    const message = 'unit testing';
    const type = 'ok';
    addNotification(title, message, type);
    expect(store.addNotification).toBeCalledWith({
      title,
      message,
      type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true,
        pauseOnHover: true,
      },
    });
  });
});
