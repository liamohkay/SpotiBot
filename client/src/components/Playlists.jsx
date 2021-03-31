import React, { useState,  useEffect } from 'react';

const Playlists = ({ playlists }) => {
  return (
    <div id="playlist-container">
      <ul>
        { playlists.map(name => <li key={name}>{name}</li>) }
      </ul>
    </div>
  );
}

export default Playlists;