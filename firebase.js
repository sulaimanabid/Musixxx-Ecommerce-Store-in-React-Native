import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDh_iQM6iDzjmabl3TD3PtiIx6Tou5VXn0",
    authDomain: "music-store-db.firebaseapp.com",
    projectId: "music-store-db",
    storageBucket: "music-store-db.appspot.com",
    messagingSenderId: "1025215597314",
    appId: "1:1025215597314:web:1ae4af68992b220f0c501b"
  };
  
  // Initialize Firebase
  

   let app = firebase.initializeApp(firebaseConfig);

   export default app

  