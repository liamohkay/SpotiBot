import React, { useState,  useEffect } from 'react';

const Playlists = ({ playlists }) => {
  return (
    <div id="playlist-container">
      { playlists.map(name => <div key={name}>{name}</div>) }
    </div>
  );
}

export default Playlists;