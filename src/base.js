import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBgfig7h0DmVQCP5JftFvRqYCEcYnNHERM",
    authDomain: "catch-of-the-day-4322f.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-4322f-default-rtdb.firebaseio.com",
    projectId: "catch-of-the-day-4322f",
    storageBucket: "catch-of-the-day-4322f.appspot.com",
    messagingSenderId: "867897239595",
    appId: "1:867897239595:web:0f3b712d9a17fef81fe26e"
  });

  const base = Rebase.createClass(firebaseApp.database());

  export { firebaseApp };

  export default base;