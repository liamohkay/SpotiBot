import firebaseConfig from './fbConfig.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize firebase app
const fb = firebase.initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId
});

export const db = fb.firestore();
export const auth = fb.auth();
export default fb;