// Libraries + dependneices
import React, { useState, useEffect } from 'react';
import { useSpotify } from '../contexts/SpotifyContext.js';
import reddit from '../../../server/reddit.js';

// { token, playlistID, subreddits, setClick }
const RunBot = () => {
  const { token, SpotifyAPI } = useSpotify();
  const [tracksToAdd, setTracksToAdd] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const [render, setRender] = useState(true);

  // A visual indicator to the user that SpotiBot is running
  useEffect(() => setFoundCount(tracksToAdd.length), [tracksToAdd])

  // Adds songs found by the bot to selected spotify playlist
  const handleAdd = (e) => {
    e.preventDefault();

    // If there are not tracks to add alert user to run the bot
    if (tracksToAdd.length === 0) {
      alert('🤖 Press "Run SpotiBot" first!');
      return;
    }

    // Spotify has a 100 song limit per request which is there are multiple cases
    if (tracksToAdd.length <= 100) {
      SpotifyAPI.addTracksToPlaylist(playlistID, tracksToAdd)
        .catch(err => console.log(err))
        .then(() => alert(`🤖 Done! Added ${tracksToAdd.length} songs 💜`))
        .then(() => setTracksToAdd([]))
    }

    // If there's more than 100 songs to add, break it up into 100 song increments
    if (tracksToAdd.length > 100) {
      let multiplier = 0;
      while ((tracksToAdd.length / (100 * multiplier) >= 1)) {
        let trackSlice = tracksToAdd.slice(100 * multiplier, 100 * (multiplier + 1));
        SpotifyAPI.addTracksToPlaylist(playlistID, trackSlice)
          .catch(err => console.log(err))
          .then(() => setTracksToAdd([]))
        multiplier++;
      }
      alert(`🤖 Done! Added ${tracksToAdd.length} songs 💜`);
    }
  }

  const handleRun = (e) => {
    e.preventDefault();

    subreddits.map((sub, subIndex) => {
      reddit.getTopPosts(sub, subPosts => {
        subPosts.map((post, postIndex) => {

          // Search by song title then check against artist name
          SpotifyAPI.searchTracks(post.track, { limit: 50 })
            .catch(err => console.log(err))
            .then(resp => {
              let trackResults = resp.tracks.items;
              // If there is a match & track is not already in playlist, add to playlist
              trackResults.map(track => {
                if (track.artists[0].name.toLowerCase() === post.artist.toLowerCase()) {
                  setTracksToAdd(prev => [...prev, track.uri]);
                }
              });
            })
        });
      });
    });
  }

  return (
    <div>
      <button id="run-bot" onClick={handleRun}>Run SpotiBot</button>
      <button id="add-songs" onClick={handleAdd}>Add Songs</button>
      <br/>
      { foundCount === 0 ? <br/> : `🤖 found ${foundCount} songs to add!`}
    </div>
  );
}

export default RunBot;