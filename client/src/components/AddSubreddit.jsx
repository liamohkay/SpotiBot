// Libraries & dependencies
import axios from 'axios';
import React, { useState } from 'react';
import { db } from '../firebase/firebase.js';
import { useSpotify } from '../contexts/SpotifyContext.js';
import useText from '../hooks/useText.js';

const AddSubreddit = ({ selected, data, setData, setClick }) => {
  const [newSub, setNewSub] = useText();

  // Adds subreddit to list and re-renders component
  const handleAdd = (e) => {
    e.preventDefault();

  }

  return (
    <div id="add-subbreddit" className="container">
      { JSON.stringify(newSub) }
      <input type="text" name="newSub" onChange={setNewSub}></input>
      <button id="add-subbreddit-btn" onClick={handleAdd}>Add Subreddit</button>
    </div>
  );
}

export default AddSubreddit;