import firebase from 'firebase/app';

const App = {
  getLoggedInUser: () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      return {
        email: currentUser.email,
        userId: currentUser.uid,
        isEmailVerified: currentUser.emailVerified,
      };
    } else {
      return undefined;
    }
  },
  isAuthenticated: () => {
    return !!(App.getLoggedInUser() && App.getLoggedInUser()!.isEmailVerified === true);
  },
};
export default App;
