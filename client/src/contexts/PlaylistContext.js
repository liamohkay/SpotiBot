import { db } from '../firebase/firebase.js';
import React, { useState, useEffect, createContext } from 'react';
import { useAuth } from './AuthContext.js';

const PlaylistContext = createContext();
export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [playlists, setPlaylists] = useState();
  const { currentUser } = useAuth();

  // Sets API token upon authorization
  useEffect(() => {
    let url = window.location.href;
    if (url.match(/\#access_token/)) {
      const tokenStr = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
      // SpotifyAPI.setAccessToken(tokenStr);
      setToken(tokenStr);
    }
  }, []);

  // Gets user playlist info on load from firestore up on sign in
  useEffect(() => {
    if (currentUser) {
      db.collection('users').doc(currentUser.uid).get()
        .then(resp => setPlaylists(resp.data().playlists))
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <PlaylistContext.Provider value={{ token, playlists }}>
      { children }
    </PlaylistContext.Provider>
  );
}