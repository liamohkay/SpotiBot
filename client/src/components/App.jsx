// Libraries & dependencies
import qs from 'qs';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [token, setToken] = useState(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setToken(qs.parse(window.location.search, { ignoreQueryPrefix: true }).code)
  }, [loaded])

  return (
    <div id="app">
      <a href="/login">
        <button onClick={() => setLoaded(true)}>Login With Spotify</button>
      </a>
    </div>
  );
};

export default App;