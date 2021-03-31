// Libraries + dependencies
import axios from 'axios';
import React, { useState } from 'react';
import Spotify from 'spotify-web-api-js';
const SpotifyAPI = new Spotify();

const AddPlaylist = (props) => {
  const { token, userID, data, setData, setSelected, setLoaded } = props;
  const [clicked, setClicked] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: '',
  });

  // Toggles conditional render of new playlist form
  const handleClick = (e) => {
    e.preventDefault();
    setClicked(prev => !prev);
  }

  // Tracks + stores user input for new playlist name + description
  const handleChange = (e) => {
    setNewPlaylist({
      ...newPlaylist,
      [e.target.name]: e.target.value
    });
  }

  // Saves playlist to spotify + returns ID for persistence
  const handleSave = (e) => {
    e.preventDefault();

    SpotifyAPI.createPlaylist(userID, newPlaylist)
      .catch(err => alert(`🤖 Failed to create your playlist ${newPlaylist.name}`))
      .then(() => {
        SpotifyAPI.getUserPlaylists(userID)
          .catch(err => console.log(err))
          .then(resp => {
            // Map through playlist to find the one we just created
            resp.items.map(item => {
            if (
              item.name === newPlaylist.name &&
              item.description === newPlaylist.description
            ) {
                let newData = data;
                let playlistInfo = {
                  id: item.id,
                  subreddits: []
                };
                newData[newPlaylist.name] = playlistInfo;
                setData(newData);
                setLoaded(prev => !prev);

                // Save new data for persistence
                axios.post('/save', {
                  dir: '/Users/Liam/Desktop/Projects/MVP/spotibot.json',
                  data: newData
                })
                  .catch(err => console.log(err))
                  .then(alert(`🤖 Created your playlist ${newPlaylist.name}!`));
              }
          });
        })
      })
    setClicked(false);
  }

  return (
    <div id="create-playlist-container">
      <form>
        <button id="create-playlist-btn" onClick={handleClick}>
          { !clicked ? 'Add New Playlist' : 'Hide' }
        </button>
        { !clicked ? null : (
          <div id="save-playlist-container">
            <h3>Enter A Playlist Name</h3>
            <input type="text" name="name" onChange={handleChange}></input>
            <br/>
            <h3>Enter A Description</h3>
            <textarea type="text" name="description" onChange={handleChange}></textarea>
            <br/>
            <button id="save-playlist-btn" onClick={handleSave}>Save Playlist</button>
          </div>
        ) }
      </form>
    </div>
  );
}

export default AddPlaylist;