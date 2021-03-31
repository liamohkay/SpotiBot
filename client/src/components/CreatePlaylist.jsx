import React, { useState } from 'react';
import Spotify from 'spotify-web-api-js';
const SpotifyAPI = new Spotify();

const CreatePlaylist = ({ token, userID, data, setData, setSelected }) => {
  const [clicked, setClicked] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: '',
  });

  // Tracks + stores user input for new playlist name + description
  const handleChange = (e) => {
    setNewPlaylist({
      ...newPlaylist,
      [e.target.name]: e.target.value
    });
  }

  // Saves playlist to spotify + returns ID for persistence
  const handleSave = (e) => {
    SpotifyAPI.createPlaylist(userID, newPlaylist)
      .catch(err => alert(`Failed to create your playlist ${newPlaylist.name}`))
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
                setSelected(newPlaylist.name);
                console.log(data);
                alert(`Created your playlist ${newPlaylist.name}`);
            }
          });
        })
      });

    setClicked(false);
  }

  return (
    <div id="create-playlist-container">
      <form>
        <button id="create-playlist-btn" onClick={() => setClicked(true)}>Create New Playlist</button>
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

export default CreatePlaylist;