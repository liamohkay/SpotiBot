import React from 'react';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';
import RunBot from './RunBot.jsx';

export default function PlaylistInfo({ selectedPlaylist }) {
  const { selected } = useSpotify();

  return (
    <section id="playlist-info">
      { !selectedPlaylist || !selectedPlaylist.images || selectedPlaylist.images.length === 0
        ? <img src="https://i1.wp.com/hertrack.com/wp-content/uploads/2018/10/no-image.jpg?w=1000&ssl=1"/>
        : <img src={selectedPlaylist.images[1].url} />
      }
      { !selected || !selectedPlaylist ? null : (
        <div id="playlist-info-container">
          <h1>{selected.name}</h1>
          <p>Followers: {selectedPlaylist.followers.total}</p>
          <p>{selectedPlaylist.description}</p>
          <RunBot />
        </div>
      ) }
    </section>
  )
}
