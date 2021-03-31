// Libraries, dependencies, components
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Playlists from './Playlists.jsx';
import UserInfo from './UserInfo.jsx';
import SubredditList from './SubredditList.jsx';
import Spotify from 'spotify-web-api-js';
import SpotiBotData from '../../../spotibot.json';
const SpotifyAPI = new Spotify();

const App = () => {
  const [token, setToken] = useState()
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState(SpotiBotData);
  const [playlists, setPlaylists] = useState();
  const [selected, setSelected] = useState();

  // Creates list of stored playlist names
  useEffect(() => {
    let names = [];
    if (data) Object.keys(data).map(name => names.push(name));
    setPlaylists(names);
    // setSelected(data[names[0]]);
    setSelected(data[names[1]]);
  }, [data]);

  // Sets API token upon authorization
  useEffect(() => {
    let url = window.location.href;
    if (url.match(/\#access_token/)) {
      const tokenStr = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
      SpotifyAPI.setAccessToken(tokenStr);
      setToken(tokenStr);
    }
  }, [loaded]);

  // Event listener that updates "selected" to the clicked playlist
  const handleSelect = (e) => setSelected(data[e.target.value]);

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
      {JSON.stringify(selected)}
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
          <div id="sidebar-container">
            <UserInfo token={token}/>
            <Playlists playlists={playlists} handleSelect={handleSelect}/>
          </div>

          <div id="main-container">
            <h1>SpotiBot</h1>
            <SubredditList
              selected={selected}
              data={data}
              setData={setData}
            />
          </div>

        </div>
      ) }

      <button onClick={handlePlaylist}>Get Playlists</button>
    </div>
  );
};

export default App;