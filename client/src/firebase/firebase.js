// Libraries + dependencies
import firebaseConfig from './fbConfig.js';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

// Initialize firebase app
const fb = firebase.intializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId
});

export const storage = fb.storage();
export const auth = fb.auth();
export default fb;