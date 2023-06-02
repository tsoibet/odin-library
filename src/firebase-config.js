const config = {
  apiKey: "AIzaSyDTea5McYphCqS9jZ-a4OKblipRYgmDJLk",
  authDomain: "odin-library-f9784.firebaseapp.com",
  projectId: "odin-library-f9784",
  storageBucket: "odin-library-f9784.appspot.com",
  messagingSenderId: "657309902591",
  appId: "1:657309902591:web:615a9d7efd0f2c70bececa",
  measurementId: "G-5JBD42XMWQ"
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}