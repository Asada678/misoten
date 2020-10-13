import firebase from 'firebase'
// import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAoz0Kk6sikHke3NlcwaKtCoCvkeaE7vBE",
  authDomain: "misoten-a6e52.firebaseapp.com",
  databaseURL: "https://misoten-a6e52.firebaseio.com",
  projectId: "misoten-a6e52",
  storageBucket: "misoten-a6e52.appspot.com",
  messagingSenderId: "865651618144",
  appId: "1:865651618144:web:d5d342697cd0628abdee05",
  measurementId: "G-MY3WPVQCDX"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const db = firebaseApp.firestore()
export default db;