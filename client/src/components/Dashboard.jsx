// Libraries, dependencies, contexts
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';
// Playlist sidebar components
import Profile from './Profile.jsx';
import Playlists from './Playlists.jsx';
import AddPlaylist from './AddPlaylist.jsx';
// Subreddits dashboard components
import RunBot from './RunBot.jsx';
import Subreddits from './Subreddits.jsx';

export default function Dashboard() {
  const { token } = useSpotify();
  const [profile, setProfile] = useState();

  // Gets spotify profile info upon oauth authorization + dashboard load
  useEffect(() => {
    if (token) {
      axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(resp => setProfile(resp.data))
        .catch(err => alert(err.message))
    }
  }, [token]);

  return (
    <div className="flex border-bg">
      <div className="nav-bg">

        <section id="login-nav-header">
          <img src="https://cdn.icon-icons.com/icons2/814/PNG/512/Spotify_icon-icons.com_66209.png" />
          <div>
            <h1>SpotiBot</h1>
            <p>The digital digger</p>
          </div>
        </section>

        <Playlists />
        { !profile ? null : <AddPlaylist spotifyID={profile.id} /> }
      </div>
      <div className="main-bg">
        <RunBot />
        <Subreddits />

      </div>
      {/* {!token || !profile ? null : (
        <div id="dashboard" className="container">
          <div id="sidebar" className="flex">
            <Profile profile={profile} />
        </div>
      )} */}
    </div>
  );
}