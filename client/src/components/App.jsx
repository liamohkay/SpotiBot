// Libraries, dependencies, components
import qs from 'qs';
import axios from 'axios';
import Spotify from 'spotify-web-api-js';
import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo.jsx';
const SpotifyAPI = new Spotify();

const App = () => {
  const [token, setToken] = useState()
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState();

  useEffect(() => {
    let url = window.location.href;
    if (url.match(/\#access_token/)) {
      const token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
      setToken(token);
      SpotifyAPI.setAccessToken(token);
    }
  }, [loaded]);

  return (
    <div id="app">
      {/* Conditional login screen if client has not authorized */}
      { token ? null : (
        <div id="login-container">
          <h1>SpotiBot</h1>
          <a href="/login">
            <button onClick={() => setLoaded(true)}>Login With Spotify</button>
          </a>
        </div>
      ) }

      {/* App after authorization from Spotify */}
      { !token ? null : (
        <div id="app-container">
          <h1>SpotiBot</h1>
          <UserInfo token={token}/>
        </div>
      ) }
    </div>
  );
};

export default App;