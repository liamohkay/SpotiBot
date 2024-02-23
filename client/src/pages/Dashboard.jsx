// Libraries, dependencies, contexts
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';
import LogoBrand from '../components/LogoBrand.jsx';
import Profile from '../components/Profile.jsx';
import YourPlaylists from '../components/sidebar/YourPlaylists.jsx';
import AddPlaylist from '../components/sidebar/AddPlaylist.jsx';
import PlaylistInfo from '../components/PlaylistInfo.jsx';
import Subreddits from '../components/Subreddits.jsx';

export default function Dashboard() {
  const { token, selected, SpotifyAPI } = useSpotify();
  const [profile, setProfile] = useState();
  const [selectedPlaylist, setSelectedPlaylist] = useState();

  // Gets spotify profile info upon oauth authorization + dashboard load
  useEffect(() => {
    if (token) {
      axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(resp => setProfile(resp.data))
        .catch(err => alert(err.message))
    }
  }, [token]);

  // Fetches + updates displayed subreddits & playlist info
  useEffect(() => {
    if (selected) {
      SpotifyAPI.getPlaylist(selected.id)
        .then(resp => setSelectedPlaylist(resp))
        .catch(err => console.log(err))
    }
  }, [selected]);

  return (
    <div className="flex border-bg">
      <div className="nav-bg">
        <LogoBrand />
        <YourPlaylists />
        { !profile ? null : <AddPlaylist spotifyID={profile.id} /> }
      </div>
      <div className="main-bg">
        { !profile? null : <Profile profile={profile} /> }
        <PlaylistInfo selectedPlaylist={selectedPlaylist} />
        <Subreddits selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} />
      </div>
    </div>
  );
}