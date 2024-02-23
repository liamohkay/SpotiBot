import React, { useState,  useEffect } from 'react';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';
import AddPlaylist from './AddPlaylist.jsx';

// Lists user playlists by name from firebase in sidebar
export default function Playlists() {
  const { playlists, handleSelect } = useSpotify();

  return (
    <div id="playlist-nav">
      <h2>Your Playlists</h2>
      {!playlists ? null : (
        <ul>
          {Object.values(playlists).map((plist, i) => (
            <>
              <li onClick={handleSelect} key={plist.name}>{plist.name}</li>
              {/* <span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                  <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
                </svg>
              </span> */}
            </>
          ))}
        </ul>

      )}
    </div>
  );
}
