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
  const [info, setInfo] = useText({ name: '', description: '' });

  // Saves playlist in firestore for persistence across sessions
  const postPlaylist = (name, id) => {
    let userRef = db.collection('users').doc(currentUser.uid);
    userRef.collection('playlists').doc(id).set({
      name: name,
      subreddits: []
    })
  }

  // Saves playlist to spotify + returns ID for persistence
  const handleSave = (e) => {
    e.preventDefault();

    SpotifyAPI.createPlaylist(spotifyID, info)
      .then(() => {
        SpotifyAPI.getUserPlaylists(spotifyID)
          .then(resp => {
            // Map through playlists to find the one we just created & extract id
            resp.items.map(item => {
              if (item.name === info.name && item.description === info.description) {
                postPlaylist(item.name, item.id);
                alert(`🤖 Created your playlist ${item.name}`);
                setIsOpen(false);
              }
            });
          })
        })
      .catch(err => alert(`🤖 Failed to create your playlist ${info.name}`))
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
          <input type="text" name="name" onChange={setInfo}></input>
          <h4>Enter A Description</h4>
          <textarea type="text" name="description" onChange={setInfo}></textarea>
        </div>
        <button id="save-playlist-btn" onClick={handleSave}>Save Playlist</button>
      </Modal>
    </>
  );
}

export default AddPlaylist;