import firebase from 'firebase/app'
import 'firebase/firestore'
 
var config = {
apiKey: "AIzaSyD3NpUWY2ENk9PutAqw5eqI_ilM0oME73U",
authDomain: "recpars-963a9.firebaseapp.com",
databaseURL: "https://recpars-963a9.firebaseio.com",
projectId: "recpars-963a9",
storageBucket: "recpars-963a9.appspot.com",
messagingSenderId: "538761817273"
};
firebase.initializeApp(config);

const db = firebase.firestore();

export default db;