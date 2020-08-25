import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDR2xJr1_uwaNVn7eCCphTCznI1DE81h_0",
  authDomain: "calendar-bc6a4.firebaseapp.com",
  databaseURL: "https://calendar-bc6a4.firebaseio.com",
  projectId: "calendar-bc6a4",
  storageBucket: "calendar-bc6a4.appspot.com",
  messagingSenderId: "975618019696",
  appId: "1:975618019696:web:36b0629b72acea32a1bfb5",
  measurementId: "G-FQ85P66NG6"
};
// Initialize Firebase
var Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;
// firebase.analytics();
