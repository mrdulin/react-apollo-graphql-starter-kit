import firebase from 'firebase';

const App = {
  authenticate: async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  },
};

export default App;
