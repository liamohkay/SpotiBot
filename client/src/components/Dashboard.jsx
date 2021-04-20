// Libraries + dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSpotify } from '../contexts/SpotifyContext.js';

import PrivateRoute from './PrivateRoute.jsx';

// Sidebar components
import Playlists from './Playlists.jsx';
import AddPlaylist from './AddPlaylist.jsx';
import ProfileInfo from './ProfileInfo.jsx';
// Main app components
import Subreddits from './Subreddits.jsx';

const Dashboard = () => {
  const { token } = useSpotify();
  const [selected, setSelected] = useState();
  const [profile, setProfile] = useState();

  // Gets spotify profile info upon authorization
  useEffect(() => {
    if (token) {
      axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(resp => setProfile(resp.data))
        .catch(err => alert(err.message))
    }
  }, [token])

  return (
    <>
      { !token || !profile ? null : (
        <div id="dashboard" className="container">
          <div id="sidebar" className="container">
            <ProfileInfo profile={profile}/>
            <div id="sidebar-playlists">
              <h2>Your SpotiBot Playlists</h2>
              <Playlists />
              <AddPlaylist spotifyID={profile.id}/>
            </div>
          </div>
          <div id="main" className="container">
            <Subreddits />
          </div>
        </div>
      ) }
    </>
  );
}

export default Dashboard;