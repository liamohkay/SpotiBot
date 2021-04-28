import React from 'react';
import { useSpotify } from '../contexts/SpotifyContext.js';

export default function ClearSongs() {
  const { selected, getSelectedPlaylist, SpotifyAPI } = useSpotify();

  // Removes songs from spotify playlist by URI
  const deleteSongs = (id, songIDs) => {
    SpotifyAPI.removeTracksFromPlaylist(id, songIDs)
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  }

  // Gets selected playlist song URIs & then deletes each song
  const handleClear = () => {
    SpotifyAPI.getPlaylistTracks(selected.id)
      .then(resp => {
        let tracksToDelete = [];
        resp.items.map(item => tracksToDelete.push(item.track.uri));
        deleteSongs(selected.id, tracksToDelete);
      })
      .then(getSelectedPlaylist())
      .catch(err => console.log(err))

    alert(`🤖 Cleared songs from the playlist "${selected.name}"`);
  }

  return (
    <button id="clear-songs" onClick={handleClear}>Clear Songs</button>
  );
}