import firebase from 'firebase';

function main() {
  const clientCredentials = {};
  firebase.initializeApp(clientCredentials);
  firebase.analytics();
}

export { main };
