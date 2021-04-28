// Libraries + dependencies
import axios from 'axios';
import Modal from 'react-modal';
import React, { useState } from 'react';
import useText from '../hooks/useText.js';
import { db } from '../firebase/firebase.js';
import { useAuth } from '../contexts/AuthContext.js';
import { useSpotify } from '../contexts/SpotifyContext.js';

const AddPlaylist = ({ spotifyID }) => {
  const { currentUser } = useAuth();
  const { token, SpotifyAPI, setUpdate } = useSpotify();
  const [isOpen, setIsOpen] = useState(false);
  const [PL, setPL] = useText({ name: '', description: '' });

  // Saves playlist in firestore db for persistence across sessions
  const postPlaylist = (name, id) => {
    let userRef = db.collection('playlists').doc(id).set({
      id,
      uid: currentUser.uid,
      name,
      subreddits: []
    });
  }

  // Saves playlist to spotify + firestore db
  const handleSave = (e) => {
    e.preventDefault();

    SpotifyAPI.createPlaylist(spotifyID, PL)
      .then(() => {
        SpotifyAPI.getUserPlaylists(spotifyID)
          .then(resp => {
            // Map through playlists to find the one just created & extract id
            resp.items.map(item => {
              if (item.name === PL.name && item.description === PL.description) {
                postPlaylist(item.name, item.id);
                alert(`🤖 Created your playlist "${item.name}"`);
                setUpdate(prev => !prev);
                setIsOpen(false);
              }
            });
          })
        })
      .catch(err => alert(`🤖 Failed to create your playlist "${PL.name}"`))
  }

  return (
    <>
      <button id="add-playlist-btn" onClick={() => setIsOpen(true)}>Add New Playlist</button>

      <Modal
        id="add-playlist-modal"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
      >
        <button id="close-modal" type="button" onClick={() => setIsOpen(false)}>x</button>

        { /* Input fields for new playlist name & description */ }
        <div id="add-playlist-info">
          <h4>Enter A Playlist Name</h4>
          <input type="text" name="name" onChange={setPL}></input>
          <h4>Enter A Description</h4>
          <textarea type="text" name="description" onChange={setPL}></textarea>
        </div>

        <button id="save-playlist-btn" onClick={handleSave}>Save Playlist</button>
      </Modal>
    </>
  );
}

export default AddPlaylist;