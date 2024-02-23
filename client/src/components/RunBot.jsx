import React, { useState, useEffect } from 'react';
import reddit from '/server/reddit.js';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';
import ClearPlaylist from './ClearPlaylist.jsx';

const RunBot = () => {
  const { selected, getSelectedPlaylist, SpotifyAPI } = useSpotify();
  const [tracksToAdd, setTracksToAdd] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const [addColor, setAddColor] = useState('black');

  useEffect(() => setFoundCount(tracksToAdd.length), [tracksToAdd])
  useEffect(() => setTracksToAdd([]), [selected]);
  useEffect(() => {
    if (foundCount === 0) {
      setAddColor('black');
    } else if (addColor === 'black' & foundCount > 0) {
      setAddColor('green');
    }
  }, [foundCount])

  // Adds songs found by the bot to selected spotify playlist
  const handleAdd = (e) => {
    e.preventDefault();

    if (tracksToAdd.length === 0) {
      alert('No tracks to add. Run SpotiBot first!');
      return;
    }

    // Break up requests into 100 song chunks
    let multiplier = 0;
    while ((tracksToAdd.length / (100 * multiplier) >= 1)) {
      let trackSlice = tracksToAdd.slice(100 * multiplier, 100 * (multiplier + 1));
      SpotifyAPI.addTracksToPlaylist(selected.id, trackSlice)
        .then(() => setTracksToAdd([]))
        .catch(err => console.log(err))
      multiplier++;
    }

    getSelectedPlaylist();
    alert(`🤖 Done! Added ${tracksToAdd.length} songs to "${selected.name}" 💜`);
  }

  const handleRun = async (e) => {
    e.preventDefault();

    if (!selected.subreddits || selected.subreddits.length === 0) {
      alert('Add subreddits to this playlist\s index first!');
      return;
    }

    selected.subreddits.map((sub, subIndex) => {
      reddit.getTopPosts(sub, subPosts => {
        subPosts.map((post, postIndex) => {

          // Search by song title then check against artist name
          SpotifyAPI.searchTracks(post.track, { limit: 50 })
            .then(resp => {

              // If there is a match & track is not already in playlist, add to playlist
              let trackResults = resp.tracks.items;
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

  const handleClearFound = (e) => {
    e.preventDefault();
    setFoundCount(0);
    setTracksToAdd([]);
  }

  return (
    <section id="bot-button-container">
      { tracksToAdd.length === 0
        ? <button id="run-bot-btn" onClick={handleRun}>Run SpotiBot</button>
        : <button id="clear-bot-btn" onClick={handleClearFound}>Clear Found</button>
      }
      <button id="add-bot-songs-btn" onClick={handleAdd} className={addColor}>{`Add ${foundCount} Songs`}</button>
      <ClearPlaylist />
    </section>
  );
}

export default RunBot;