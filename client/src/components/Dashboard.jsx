// Libraries, dependencies, contexts
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';
// Playlist sidebar components
import Profile from '/client/src/components/Profile.jsx';
import Playlists from '/client/src/components/Playlists.jsx';
import AddPlaylist from '/client/src/components/AddPlaylist.jsx';
// Subreddits dashboard components
import Subreddits from '/client/src/components/Subreddits.jsx';

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
    <>
      {!token || !profile ? null : (
        <div id="dashboard" className="container">
          <div id="sidebar" className="flex">
            <Profile profile={profile} />
            <h2>Your SpotiBot Playlists</h2>
            <div id="sidebar-playlists" className="flex">
              <Playlists />
              <AddPlaylist spotifyID={profile.id} />
            </div>
          </div>
          <Subreddits />
        </div>
      )}
    </>
  );
}