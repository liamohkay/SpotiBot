import React, { useState,  useEffect } from 'react';

const Playlists = ({ playlists, handleSelect }) => {
  return (
    <div id="playlist-container">
      <ul>
        { playlists.map(name => <li onClick={handleSelect} key={name}>{name}</li>) }
      </ul>
    </div>
  );
}

export default Playlists;