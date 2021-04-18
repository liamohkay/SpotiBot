// Libraries + dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SpotiBotData from '../../../spotibot.json';
import Spotify from 'spotify-web-api-js';
const SpotifyAPI = new Spotify();

// Sidebar components
import UserInfo from './UserInfo.jsx';
import Playlists from './Playlists.jsx';
import AddPlaylist from './AddPlaylist.jsx';
// Main app components
import Subreddits from './Subreddits.jsx';
import LoginSignup from './LoginSignup.jsx';
// Contexts
import { AuthProvider } from '../contexts/AuthContext.js';


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
    <>
    <AuthProvider>
      <div id="app">

        {/* Conditional login screen if client has not authorized */}
        { token ? null : (
          // <div id="login-container">
          //   <h1 id="title">SpotiBot</h1>
          //   <a href="/login">
          //     <button id="login-btn" onClick={() => setLoaded(true)}>Login With Spotify</button>
          //   </a>
          // </div>
          <LoginSignup />
        ) }

        {/* App after Spotify authorization */}
        { !token || !user ? null : (
          <div id="app-container">
            <div id="sidebar-container">
              <UserInfo user={user} />
              <div id="sidebar-playlists">
                <h2>Your SpotiBot Playlists</h2>
                <Playlists
                  playlists={playlists}
                  handleSelect={handleSelect}
                />
                <AddPlaylist
                  token={token}
                  userID={user.id}
                  data={data}
                  setData={setData}
                  setSelected={setSelected}
                  setLoaded={setLoaded}
                />
              </div>
            </div>
            { JSON.stringify(data) === '{}' ? <h1>You have no playlists<br/>Create one in the sidebar</h1> : (
            <div id="main-container">
              <Subreddits
                token={token}
                selected={selected}
                data={data}
                setData={setData}
              />
            </div>
            ) }

          </div>
        ) }

      </div>
      </AuthProvider>
    </>
  );
};

export default App;