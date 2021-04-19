// Libraries + dependencies
import React, { useState,  useEffect } from 'react';
import { useSpotify } from '../contexts/SpotifyContext.js';

const Playlists = ({ handleSelect }) => {
  const { playlists } = useSpotify();

  return (
    <div id="playlist-container">
      <ul>
        {/* { playlists.map(plist => (
          <li onClick={handleSelect} key={plist.name}>{plist.name}</li>
        )) } */}
      </ul>
    </div>
  );
}

export default Playlists;