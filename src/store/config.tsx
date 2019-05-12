import * as firebase from 'firebase';
import { keys } from '../../keys';

const firebaseConfig = keys;

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const db = firebase.firestore();