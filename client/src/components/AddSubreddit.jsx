import React, { useState } from 'react';

const AddSubreddit = ({ selected, data, setData, setClick }) => {
  const [newSub, setNewSub] = useState('');
  const handleChange = (e) => setNewSub(e.target.value);
  const handleAdd = (e) => {
    e.preventDefault();
    let newData = data;
    newData[selected].subreddits.push(newSub);
    setData(newData);
    setClick(prev => !prev);
  }
  return (
    <form>
      <input type="text" name="newSub" onChange={handleChange}></input>
      <button onClick={handleAdd}>Add Subreddit</button>
    </form>
  );
}

export default AddSubreddit;