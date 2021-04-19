import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';
import { AuthContext } from './AuthContext.js';

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState();

  return (
    <PlaylistContext.Provider value={playlists}>
      { children }
    </PlaylistContext.Provider>
  );
}