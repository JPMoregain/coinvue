import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    // store API info from Google firebase in this object, which will be used to connect app to firebase
    // Your web app's Firebase configuration
  apiKey: "AIzaSyCgRSD0pQgmVL2-bmOgXER8mW5iKBwMN0A",
  authDomain: "coinvue.firebaseapp.com",
  projectId: "coinvue",
  storageBucket: "coinvue.appspot.com",
  messagingSenderId: "502141940045",
  appId: "1:502141940045:web:a45920dd25d3a6e3010704",
  measurementId: "G-FKYQN6PCN9"
};

// Initialize firebase app
const app = firebase.initializeApp(config);
// Initialize auth and database
const auth = app.auth();
const db = app.firestore();

export { app, db, auth }