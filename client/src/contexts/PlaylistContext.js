import { db } from '../firebase/firebase.js';
import React, { useState, useEffect, createContext } from 'react';
import { useAuth } from './AuthContext.js';

const PlaylistContext = createContext();
export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [playlists, setPlaylists] = useState();
  const { currentUser } = useAuth();

  // Gets user playlist info on load from firestore
  useEffect(() => {
    if (currentUser) {
      db.collection('users').doc(currentUser.uid).get()
        .then(resp => setPlaylists(resp.data().playlists))
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <PlaylistContext.Provider value={playlists}>
      { children }
    </PlaylistContext.Provider>
  );
}