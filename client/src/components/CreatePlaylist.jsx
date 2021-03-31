import React, { useState } from 'react';
import Spotify from 'spotify-web-api-js';
const SpotifyAPI = new Spotify();

const CreatePlaylist = ({ token, userID, data, setData, setSelected }) => {
  const [clicked, setClicked] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState('');

  // Tracks + stores user input for new playlist name
  const handleChange = (e) => setNewPlaylist(e.target.value);

  // Saves playlist to spotify + returns ID for persistence
  const handleSave = (e) => {
    SpotifyAPI.createPlaylist()
    setClicked(false);
  }

  return (
    <div id="create-playlist-container">
      <form>
        <button id="create-playlist-btn" onClick={() => setClicked(true)}>Create New Playlist</button>
        { !clicked ? null : (
          <div id="save-playlist-container">
            <h3>Enter A Playlist Name</h3>
            <br/>
            <input type="text" name="save-playlist-input" onChange={handleChange}></input>
            <button id="save-playlist-btn" onClick={handleSave}>Save Playlist</button>
          </div>
        ) }
      </form>
    </div>
  );
}

export default CreatePlaylist;