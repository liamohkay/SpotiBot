// Libraries, dependencies, contexts
import React, { useState, useEffect } from 'react';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';
import reddit from '/server/reddit.js';
// Components
import ClearSongs from '/client/src/components/ClearSongs.jsx';

const RunBot = () => {
  const { selected, getSelectedPlaylist, SpotifyAPI } = useSpotify();
  const [tracksToAdd, setTracksToAdd] = useState([]);
  const [foundCount, setFoundCount] = useState(0);

  // A visual indicator to the user that SpotiBot is running
  useEffect(() => setFoundCount(tracksToAdd.length), [tracksToAdd])

  // Resets tracks to add when a different playlist is clicked & bot run + songs added
  useEffect(() => setTracksToAdd([]), [selected]);

  // Adds songs found by the bot to selected spotify playlist
  const handleAdd = (e) => {
    e.preventDefault();

    // If there are not tracks to add alert user to run the bot
    if (tracksToAdd.length === 0) {
      alert('🤖 Press "Run SpotiBot" first!');
      return;
    }

    // Spotify has a 100 song limit per request so we have break up requests into 100 song chunks
    let multiplier = 0;
    while ((tracksToAdd.length / (100 * multiplier) >= 1)) {
      let trackSlice = tracksToAdd.slice(100 * multiplier, 100 * (multiplier + 1));
      SpotifyAPI.addTracksToPlaylist(selected.id, trackSlice)
        .then(() => setTracksToAdd([]))
        .catch(err => console.log(err))
      multiplier++;
    }

    // This simply triggers a get + render of the latest artwork from spotify after songs have been added
    getSelectedPlaylist();
    alert(`🤖 Done! Added ${tracksToAdd.length} songs to "${selected.name}" 💜`);
  }

  const handleRun = (e) => {
    e.preventDefault();
    if (!selected.subreddits || selected.subreddits.length === 0) {
      alert('Add subreddits to this playlist first!');
      return;
    }

    selected.subreddits.map((sub, subIndex) => {
      reddit.getTopPosts(sub, subPosts => {
        subPosts.map((post, postIndex) => {

          // Search by song title then check against artist name
          SpotifyAPI.searchTracks(post.track, { limit: 50 })
          .then(resp => {
            let trackResults = resp.tracks.items;
            // If there is a match & track is not already in playlist, add to playlist
            trackResults.map(track => {
              if (track.artists[0].name.toLowerCase() === post.artist.toLowerCase()) {
                setTracksToAdd(prev => [...prev, track.uri]);
              }
            });
          })
          .catch(err => console.log(err))
        });
      });
    });
  }

  return (
    <div id="action-btns" className="flex">
      {`🤖 found ${foundCount} songs!`}
      <button id="run-bot" onClick={handleRun}>Run SpotiBot</button>
      <button id="add-songs" onClick={handleAdd}>Add Songs</button>
      <ClearSongs />
    </div>
  );
}

export default RunBot;