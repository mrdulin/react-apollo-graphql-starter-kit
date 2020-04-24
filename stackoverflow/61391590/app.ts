import firebase from 'firebase/app';

const App = {
  signup: async (email, password) => {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await userCredential.user!.sendEmailVerification();
    return `Check your email for verification mail before logging in`;
  },
};
export default App;
