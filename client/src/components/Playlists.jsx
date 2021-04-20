// Libraries + dependencies
import React, { useState,  useEffect } from 'react';
import { useSpotify } from '../contexts/SpotifyContext.js';

const Playlists = () => {
  const { playlists, handleSelect } = useSpotify();

  return (
    <>
      { !playlists ? null : (
        <div id="playlist-container">
          <ul>
            { Object.values(playlists).map(plist => (
              <li onClick={handleSelect} key={plist.name}>{plist.name}</li>
            )) }
          </ul>
        </div>
      ) }
    </>
  );
}

export default Playlists;