// Libraries, dependencies, components
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SpotiBotData from '../../../spotibot.json';
import Spotify from 'spotify-web-api-js';
const SpotifyAPI = new Spotify();
// Sidebar components
import UserInfo from './UserInfo.jsx';
import Playlists from './Playlists.jsx';
import CreatePlaylist from './CreatePlaylist.jsx';
// Main app components
import Subreddits from './Subreddits.jsx';

const App = () => {
  const [token, setToken] = useState();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(SpotiBotData);
  const [user, setUser] = useState();
  const [playlists, setPlaylists] = useState();
  const [selected, setSelected] = useState();

  // Creates list of stored playlist names
  useEffect(() => {
    let names = [];
    if (data) Object.keys(data).map(name => names.push(name));
    setPlaylists(names);
    setSelected(names[0]);
  }, [data, loaded]);

  // Sets API token upon authorization
  useEffect(() => {
    let url = window.location.href;
    if (url.match(/\#access_token/)) {
      const tokenStr = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
      SpotifyAPI.setAccessToken(tokenStr);
      setToken(tokenStr);
    }
  }, [loaded]);

  // Gets user info upon authorization
  useEffect(() => {
    if (token) {
      axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': 'Bearer ' + token } })
        .catch(err => console.log(err))
        .then(resp => setUser(resp.data))
    }
  }, [token])

  // Updates "selected" to the user-clicked playlist
  const handleSelect = (e) => setSelected(e.target.innerText);

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

      {/* App after Spotify authorization */}
      { !token || !user ? null : (
        <div id="app-container">
          <div id="sidebar-container">
            <UserInfo user={user} />
            <Playlists
              playlists={playlists}
              handleSelect={handleSelect}
            />
            <CreatePlaylist
              token={token}
              userID={user.id}
              data={data}
              setData={setData}
              setSelected={setSelected}
              setLoaded={setLoaded}
            />
          </div>

          <div id="main-container">
            <Subreddits
              token={token}
              selected={selected}
              data={data}
              setData={setData}
            />
          </div>

        </div>
      ) }

    </div>
  );
};

export default App;