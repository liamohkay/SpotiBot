import axios from 'axios';
import React, { useState } from 'react';
import { db } from '/client/src/firebase/firebase.js';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';
import useInput from '../utils/useInput.js';

export default function AddSubreddit() {
  const { selected, getSelectedPlaylist } = useSpotify();
  const [newSub, setNewSub] = useInput();

  // Adds subreddit to list and re-renders component
  const handleAdd = (e) => {
    e.preventDefault();

    if (!newSub || newSub === '') {
      alert('Enter a subreddit name!');
      return;
    }

    db.collection('playlists').doc(selected.id).set({
      subreddits: selected.subreddits.concat([newSub.newSub])
    }, { merge: true })
      .then(() => getSelectedPlaylist())
      .catch(err => alert(`Subreddit could not be added`))
  }

  return (
    <form id="add-subreddit" className="flex">
      <input
        type="text"
        name="newSub"
        placeholder="Enter Subreddit Name"
        onChange={setNewSub}
      />
      <button id="add-subbreddit-btn" onClick={handleAdd}>Add to Index</button>
    </form>
  );
}