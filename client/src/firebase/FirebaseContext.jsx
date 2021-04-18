// Libraries + dependencies
import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from './firebase.js';

// Firebase auth context
const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);

// Firebase auth context provider
export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  // Firebase user auth functionality
  const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);
  const login = (email, password) => auth.signInWithemailAndPassword(email, password);
  const logout = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user) => {
      setCurrentUser(user);
      setLoading(false);
    }
  }, []);

  const values = {
    currentUser,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
}