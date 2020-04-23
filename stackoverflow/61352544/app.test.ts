import App from './app';
import firebase from 'firebase/app';

jest.mock('firebase/app', () => {
  return {
    auth: jest.fn().mockReturnThis(),
    signInWithEmailAndPassword: jest.fn(),
  };
});

describe('61352544', () => {
  it('should pass', async () => {
    const email = 'example@gmail.com';
    const password = '123';
    await App.authenticate(email, password);
    expect(firebase.auth().signInWithEmailAndPassword).toBeCalledWith(email, password);
  });
});
