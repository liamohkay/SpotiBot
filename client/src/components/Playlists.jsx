import React, { useState,  useEffect } from 'react';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';

// Lists user playlists by name from firebase in sidebar
export default function Playlists() {
  const { playlists, handleSelect } = useSpotify();

  return (
    <>
      { !playlists ? null : (
        <div id="playlists" className="flex">
          <ul>
            {Object.values(playlists).map(plist => (
              <li onClick={handleSelect} key={plist.name}>{plist.name}</li>
            ))}
          </ul>
        </div>
      ) }
    </>
  );
}
