// Libraries + dependencies
import { db } from '../firebase/firebase.js';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { useAuth } from './AuthContext.js';
import Spotify from 'spotify-web-api-js';

// Context that provides playlist info, spotify access token + web api wrapper
const SpotifyAPI = new Spotify();
const SpotifyContext = createContext();
export const useSpotify = () => useContext(SpotifyContext);

export const SpotifyProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [playlists, setPlaylists] = useState();
  const { currentUser } = useAuth();

  // Stores API token upon authorization + gives token to api wrapper to make requests
  useEffect(() => {
    let url = window.location.href;
    if (url.match(/\#access_token/)) {
      const tokenStr = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
      SpotifyAPI.setAccessToken(tokenStr);
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
    <SpotifyContext.Provider value={{ token, SpotifyAPI, playlists }}>
      { children }
    </SpotifyContext.Provider>
  );
}