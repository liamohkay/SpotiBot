import React, { useState, useEffect } from 'react';
import reddit from '../../../server/reddit.js';
import Spotify from 'spotify-web-api-js';
const SpotifyAPI = new Spotify();

const RunBot = ({ token, playlistID, subreddits, setClick }) => {
  const [currentTracks, setCurrentTracks] = useState([]);
  const [tracksToAdd, setTracksToAdd] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const [render, setRender] = useState(true);
  SpotifyAPI.setAccessToken(token);

  // A visual indicator to the user that SpotiBot is running
  useEffect(() => setFoundCount(tracksToAdd.length), [tracksToAdd])

  // Adds songs found by the bot to selected spotify playlist
  const handleAdd = (e) => {
    e.preventDefault();

    if (tracksToAdd.length === 0) {
      alert('🤖 Press "Run SpotiBot" first!');
      return;
    }
    if (tracksToAdd.length <= 100) {
      SpotifyAPI.addTracksToPlaylist(playlistID, tracksToAdd)
        .catch(err => console.log(err))
        .then(() => alert(`🤖 Done! Added ${tracksToAdd.length} songs 💜`))
        .then(() => setTracksToAdd([]))
    }
    if (tracksToAdd.length > 100) {
      let multiplier = 0;
      while ((tracksToAdd.length / (100 * multiplier) >= 1)) {
        let trackSlice = tracksToAdd.slice(100 * multiplier, 100 * (multiplier + 1));
        multiplier++;
        SpotifyAPI.addTracksToPlaylist(playlistID, trackSlice)
          .catch(err => console.log(err))
          .then(() => setTracksToAdd([]))
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