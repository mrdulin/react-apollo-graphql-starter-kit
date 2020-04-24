import App from './app';
import firebase from 'firebase/app';

const userCredentialMock = {
  user: {
    sendEmailVerification: jest.fn(),
  },
};

jest.mock('firebase/app', () => {
  return {
    auth: jest.fn().mockReturnThis(),
    createUserWithEmailAndPassword: jest.fn(() => userCredentialMock),
  };
});

describe('61391590', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should pass', async () => {
    const email = 'example@gmail.com';
    const password = '123';
    const actual = await App.signup(email, password);
    expect(actual).toEqual('Check your email for verification mail before logging in');
    expect(firebase.auth().createUserWithEmailAndPassword).toBeCalledWith(email, password);
    expect(userCredentialMock.user?.sendEmailVerification).toBeCalled();
  });
});
