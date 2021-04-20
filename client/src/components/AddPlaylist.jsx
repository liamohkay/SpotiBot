// Libraries + dependencies
import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import useText from '../hooks/useText.js';
import { db } from '../firebase/firebase.js';
import { useAuth } from '../contexts/AuthContext.js';
import { useSpotify } from '../contexts/SpotifyContext.js';

// const modalStyle = {
//   content : {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)'
//   }
// };

const AddPlaylist = ({ spotifyID }) => {
  const { currentUser } = useAuth();
  const { token, SpotifyAPI } = useSpotify();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useText({ name: '', description: '' });

  const postPlaylist = (playlist) => {
    db.collection('users').doc(resp.user.uid).set({ playlists: [] });
  }

  // Saves playlist to spotify + returns ID for persistence
  const handleSave = (e) => {
    e.preventDefault();

    SpotifyAPI.createPlaylist(spotifyID, text)
      .catch(err => alert(`🤖 Failed to create your playlist ${text.name}`))
      .then(() => {
        SpotifyAPI.getUserPlaylists(spotifyID)
          .then(resp => {
            // Map through playlist to find the one we just created
            resp.items.map(item => {
              if (item.name === text.name && item.description === text.description) {
                let newData = data;
                let playlistInfo = {
                  id: item.id,
                  subreddits: []
                };

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
  }

  return (
    <>
      <button id="create-playlist-btn" onClick={() => setIsOpen(true)}>
        { !isOpen ? 'Add New Playlist' : 'Hide' }
      </button>
      <Modal
        id="create-playlist-modal"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
      >
        <button id="close-modal" type="button" onClick={() => setIsOpen(false)}>x</button>
        <div id="save-playlist-container">
          <h4>Enter A Playlist Name</h4>
          <input type="text" name="name" onChange={setText}></input>
          <h4>Enter A Description</h4>
          <textarea type="text" name="description" onChange={setText}></textarea>
        </div>
        <button id="save-playlist-btn" onClick={() => setIsOpen(false)}>Save Playlist</button>
      </Modal>
    </>
  );
}

export default AddPlaylist;