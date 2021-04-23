// Libraries & dependencies
import axios from 'axios';
import React, { useState } from 'react';
import { db } from '../firebase/firebase.js';
import { useSpotify } from '../contexts/SpotifyContext.js';
import useText from '../hooks/useText.js';

const AddSubreddit = () => {
  const { selected, getSelectedPlaylist } = useSpotify();
  const [newSub, setNewSub] = useText();

  // Adds subreddit to list and re-renders component
  const handleAdd = (e) => {
    e.preventDefault();

    db.collection('playlists').doc(selected.id).set({
      subreddits: selected.subreddits.concat([newSub.newSub])
    }, { merge: true })
      .then(() => getSelectedPlaylist())
      .catch(err => alert(`Subreddit could not be added`))
  }

  return (
    <div id="add-subbreddit" className="container">
      <input type="text" name="newSub" onChange={setNewSub}></input>
      <button id="add-subbreddit-btn" onClick={handleAdd}>Add Subreddit</button>
    </div>
  );
}

export default AddSubreddit;