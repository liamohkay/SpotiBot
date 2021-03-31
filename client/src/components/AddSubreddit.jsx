// Libraries & dependencies
import axios from 'axios';
import React, { useState } from 'react';

const AddSubreddit = ({ selected, data, setData, setClick }) => {
  const [newSub, setNewSub] = useState();

  // Tracks + stores user input for a new subreddit
  const handleChange = (e) => setNewSub(e.target.value);

  // Adds subreddit to list and re-renders component
  const handleAdd = (e) => {
    e.preventDefault();
    let newData = data;
    newData[selected].subreddits.push(newSub);
    setData(newData);
    setClick(prev => !prev);

    // Save new data for persistence
    axios.post('/save', {
      dir: '/Users/Liam/Desktop/Projects/MVP/spotibot.json',
      data: newData
    }).catch(err => console.log(err))
  }

  return (
    <form>
      <input type="text" name="newSub" onChange={handleChange}></input>
      <button onClick={handleAdd}>Add Subreddit</button>
    </form>
  );
}

export default AddSubreddit;