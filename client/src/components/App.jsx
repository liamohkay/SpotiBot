// Libraries, dependencies, components
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo.jsx';
import SubredditList from './SubredditList.jsx';
import Spotify from 'spotify-web-api-js';
import SpotiBotData from '../../../spotibot.json';
const SpotifyAPI = new Spotify();

const App = () => {
  const [token, setToken] = useState()
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState(SpotiBotData);

  useEffect(() => {
    let url = window.location.href;
    if (url.match(/\#access_token/)) {
      const tokenStr = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
      SpotifyAPI.setAccessToken(tokenStr);
      setToken(tokenStr);
    }
  }, [loaded]);

  const handlePlaylist = () => {
    console.log(data);
    // fetch('../../../spotibot.json', { headers: {
    //   'Content-Type': 'application/json'
    // }})
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err))
    // SpotifyAPI.getUserPlaylists('liamohkay')
    //   .catch(err => console.log(err))
    //   .then(data => console.log(data))

    /// get single playlist
    // SpotifyAPI.getPlaylist('37i9dQZEVXcCwTwHgx6kYA')
    //   .catch(err => console.log(err))
    //   .then(data => console.log(data))

    // data.name: data.id
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

          <div id="sidebar-container">
            <UserInfo token={token}/>
          </div>
          <SubredditList data={data} setData={setData}/>

        </div>
      ) }

      <button onClick={handlePlaylist}>Get Playlists</button>
    </div>
  );
};

export default App;