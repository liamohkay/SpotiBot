import React, { useState } from 'react';

const AddSubreddit = ({ data, setData }) => {
  const [newSub, setNewSub] = useState('');
  const handleChange = (e) => setNewSub(e.target.value);
  return (
    <form>
      <label htmlFor="newSub">Enter A Subbreddit Name</label>
      <input type="text" name="newSub" onChange={handleChange}></input>
      <button>Save Subreddit</button>
    </form>
  );
}

export default AddSubreddit;