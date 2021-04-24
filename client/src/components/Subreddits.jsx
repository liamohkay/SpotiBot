// Libraries + dependencies
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase.js';
import { useSpotify } from '../contexts/SpotifyContext.js';
import AddSubreddit from './AddSubreddit.jsx';
import RunBot from './RunBot.jsx';
import ClearSongs from './ClearSongs.jsx';

const SubredditList = () => {
  const { selected, getSelectedPlaylist, SpotifyAPI } = useSpotify();
  const [selectedInfo, setSelectedInfo] = useState();

  // Fetches + updates displayed subreddits & playlist info
  useEffect(() => {
    if (selected) {
      SpotifyAPI.getPlaylist(selected.id)
        .then(resp => setSelectedInfo(resp))
        .catch(err => console.log(err))
    }
  }, [selected]);

  // Deletes subreddit on tile click
  const handleDelete = (e) => {
    let index = selected.subreddits.indexOf(e.target.innerText);
    selected.subreddits.splice(index, 1);
    db.collection('playlists').doc(selected.id).set({
      subreddits: selected.subreddits
    }, { merge: true })
    .then(() => getSelectedPlaylist())
    .catch(err => alert(`Subreddit could not be removed from ${selcted.name}`))
  }

  return (
    <>
      {!selectedInfo ? null : (
        <>
          <div id="subreddits-header">
            {selectedInfo.images.length === 0 ? null : (
              <img id="selected-playlist-img" src={selectedInfo.images[1].url} />
            )}
          </div>

          <div id="selected-info">
            <h2>{selected.name}</h2>
            <p>{selectedInfo.description}</p>
            <div>Followers: {selectedInfo.followers.total}</div>
          </div>
          <RunBot subreddits={selected.subreddits} />
          <ClearSongs />

          <div id="subreddits-container">
            <h2>Subreddits in {selected.name}</h2>
            <div id="subreddits-main">
              {selected.subreddits.map(sub => (
                <div className="subreddit-tile" onClick={handleDelete} key={sub}>{sub}</div>
              ))}
            </div>
          </div>
          <AddSubreddit />
        </>
      )}
    </>

  );
}

export default SubredditList;