import React from 'react';
import { useSpotify } from '../contexts/SpotifyContext.js';

const ClearSongs = () => {
  const { selected, SpotifyAPI } = useSpotify();

  const deleteSongs = (id, songIDs) => {
    SpotifyAPI.removeTracksFromPlaylist(id, songIDs)
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  }

  const handleClear = () => {
    SpotifyAPI.getPlaylistTracks(selected.id)
      .then(resp => {
        let tracksToDelete = [];
        resp.items.map(item => tracksToDelete.push(item.track.uri));
        deleteSongs(selected.id, tracksToDelete);
      })
      .catch(err => console.log(err))

    alert(`🤖 Cleared songs from the playlist "${selected.name}"`);
  }

  return (
    <button onClick={handleClear}>{`Clear songs from ${selected.name}`}</button>
  );
}

export default ClearSongs;