import React from 'react';
import { useSpotify } from '../../contexts/SpotifyContext.js';

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
        let multiplier = 0;
        let tracksToDelete = [];
        resp.items.map(item => tracksToDelete.push(item.track.uri));

        while ((tracksToDelete.length / (100 * multiplier) >= 1)) {
          let trackSlice = tracksToDelete.slice(100 * multiplier, 100 * (multiplier + 1));
          deleteSongs(selected.id, trackSlice);
          multiplier++;
        }
      })
      .then(() => {
        getSelectedPlaylist();
        alert(`🤖 Cleared songs from the playlist "${selected.name}"`);
      })
      .catch(err => console.log(err))
  }

  return (
    <button id="clear-playlist-btn" onClick={handleClear}>Clear Playlist</button>
  );
}