import React, { useState } from 'react';

const AddSubreddit = ({ data, setData }) => {
  const [newName, setNewName] = useState('');
  const handleChange = (e) => setNewName(e.target.value);
  return (
    <form>
      {newName}
      <label htmlFor="newName">Enter A Playlist Name</label>
      <input type="text" name="newName" onChange={handleChange}></input>
      <button>Save New Playlist</button>
    </form>
  );
}

export default AddSubreddit;