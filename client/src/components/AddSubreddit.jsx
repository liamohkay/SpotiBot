import React, { useState } from 'react';

const AddSubreddit = ({ data, setData }) => {
  const [newSub, setNewSub] = useState('');
  const handleChange = (e) => setNewSub(e.target.value);
  return (
    <form>
      <input type="text" name="newSub" onChange={handleChange}></input>
      <button>Save Subreddit</button>
    </form>
  );
}

export default AddSubreddit;