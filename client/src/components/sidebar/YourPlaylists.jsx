import React from 'react';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';

// Lists user playlists by name from firebase in sidebar
export default function YourPlaylists() {
  const { selected, playlists, handleSelect } = useSpotify();

  return (
    <section id="playlist-nav">
      <h2>Your Playlists</h2>
      { !playlists ? null : (
        <ul>
          { Object.values(playlists).map(plist => (
            <li onClick={handleSelect} key={plist.name}>{plist.name}</li>
          )) }
        </ul>
      ) }
    </section>
  );
}
