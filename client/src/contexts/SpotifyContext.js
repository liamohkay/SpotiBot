// Libraries + dependencies
import React, { useState, useEffect, useContext, createContext } from 'react';
import { db } from '../firebase/firebase.js';
import { useAuth } from './AuthContext.js';
import Spotify from 'spotify-web-api-js';

// Context that provides playlist info, spotify access token + web api wrapper
const SpotifyAPI = new Spotify();
const SpotifyContext = createContext();
export const useSpotify = () => useContext(SpotifyContext);

export const SpotifyProvider = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const [token, setToken] = useState();
  const [selected, setSelected] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [update, setUpdate] = useState(false);

  // Updates "selected" to the user-clicked playlist
  const handleSelect = (e) => {
    playlists.map(playlist => {
      if (playlist.name === e.target.innerText) {
        setSelected(playlist);
      }
    });
  };

  // Fetches latest data from db for currently selected playlist & triggers re-render
  const getSelectedPlaylist = () => {
    db.collection('playlists').where('id', '==', selected.id).get()
      .then(resp => resp.forEach(doc => setSelected(doc.data())))
      .catch(err => console.log(err))
  }

  // Get all user playlists & sets to state
  const getUserPlaylists = () => {
    db.collection('playlists').where('uid', '==', currentUser.uid).get()
      .then(resp => {
        let data = [];
        resp.forEach(doc => data.push(doc.data()));
        setPlaylists(data);
        setSelected(data[0]);
      })
      .catch(err => console.log(err))
  }

  // Stores API token upon authorization + gives token to api wrapper to make requests
  useEffect(() => {
    let url = window.location.href;
    if (url.match(/\#access_token/)) {
      const tokenStr = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
      SpotifyAPI.setAccessToken(tokenStr);
      setToken(tokenStr);
    } else if (!token) {
      logout()
    }
  }, []);



  // Triggers re-render
  useEffect(() => {
    if (currentUser) {
      getUserPlaylists();
    }
  }, [update]);

  let values = {
    token,
    SpotifyAPI,
    playlists,
    selected,
    setUpdate,
    handleSelect,
    getSelectedPlaylist
  };

  return (
    <SpotifyContext.Provider value={values}>
      { children }
    </SpotifyContext.Provider>
  );
}