import * as firebase from 'firebase';
//import { keys } from '../../keys';

const firebaseConfig =  {
    apiKey: "AIzaSyAYmtwSekzGtfGwWIOCXkimRzZL5eJIaGY",
    authDomain: "game-tools-b5a6d.firebaseapp.com",
    databaseURL: "https://game-tools-b5a6d.firebaseio.com",
    projectId: "game-tools-b5a6d",
    storageBucket: "game-tools-b5a6d.appspot.com",
    messagingSenderId: "573871543925",
    appId: "1:573871543925:web:e8037bddb28b819b"
  };

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const db = firebase.firestore();