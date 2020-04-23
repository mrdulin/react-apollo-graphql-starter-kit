import firebase from 'firebase/app';

const App = {
  authenticate: async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  },
};

export default App;
