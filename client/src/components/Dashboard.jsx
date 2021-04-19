// Libraries + dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { usePlaylist } from '../contexts/PlaylistContext.js';
import SpotiBotData from '../../../spotibot.json';

import PrivateRoute from './PrivateRoute.jsx';

// Sidebar components
import Playlists from './Playlists.jsx';
import AddPlaylist from './AddPlaylist.jsx';
import ProfileInfo from './ProfileInfo.jsx';
// Main app components
import Subreddits from './Subreddits.jsx';

const Dashboard = () => {
  const { token, playlists } = usePlaylist();
  // const [token, setToken] = useState();
  const [loaded, setLoaded] = useState(false);
  // const [data, setData] = useState(SpotiBotData);
  const [profile, setProfile] = useState();
  // const [playlists, setPlaylists] = useState();
  const [selected, setSelected] = useState();

  // // Creates list of stored playlist names
  // useEffect(() => {
  //   let names = [];
  //   if (data) Object.keys(data).map(name => names.push(name));
  //   setPlaylists(names);
  //   setSelected(names[0]);
  // }, [data, loaded]);


  // Gets spotify profile info upon authorization
  useEffect(() => {
    if (token) {
      axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(resp => setProfile(resp.data))
        .catch(err => console.log(err))
    }
  }, [token])

  // Updates "selected" to the user-clicked playlist
  const handleSelect = (e) => setSelected(e.target.innerText);

  return (
    <>
      { JSON.stringify(playlists) }
      {/* App after Spotify authorization */}
        { !token || !profile ? null : (
          <div id="app-container">
            <div id="sidebar-container">
              <ProfileInfo />
              {/* <div id="sidebar-playlists">
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
              </div> */}
            </div>
            {/* { JSON.stringify(data) === '{}' ? <h1>You have no playlists<br/>Create one in the sidebar</h1> : (
            <div id="main-container">
              <Subreddits
                token={token}
                selected={selected}
                data={data}
                setData={setData}
              />
            </div>
            ) } */}

          </div>
        ) }

    </>
  );
}

export default Dashboard;