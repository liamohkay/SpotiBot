// Libraries + dependencies
import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../firebase/firebase.js';

// Firebase context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Firebase auth functions
  const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);
  const login = (email, password) => auth.signInWithEmailAndPassword(email, password);
  const logout = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    })

    return unsubscribe;
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, login, signup, logout}}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
