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
    const token = qs.parse(window.location.search, { ignoreQueryPrefix: true }).access_token
    setToken(token);
    SpotifyAPI.setAccessToken(token);
  }, [qs.parse(window.location.search, { ignoreQueryPrefix: true }).access_token])

  const handlePlaylist = () => {
    axios.get('/playlist', { headers: { authorization: token } })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }


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
      <button onClick={handlePlaylist}>Get Playlist</button>
      <h1>DATA {data}</h1>
    </div>
  );
};

export default App;