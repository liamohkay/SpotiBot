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
        .catch(err => console.log(err))
    }
  }, [token])

  return (
    <>
      {/* App after Spotify authorization */}
        { !token || !profile ? null : (
          <div id="app-container">
            <div id="sidebar-container">
              <ProfileInfo profile={profile}/>
              <div id="sidebar-playlists">
                <h2>Your SpotiBot Playlists</h2>
                <Playlists />
                <AddPlaylist spotifyID={profile.id}/>
              </div>
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