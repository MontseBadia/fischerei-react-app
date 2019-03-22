import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCv8GeAuVstbCr16VAzD6b4NAv3VS8zTGY",
  authDomain: "fischerei.firebaseapp.com",
  databaseURL: "https://fischerei.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;