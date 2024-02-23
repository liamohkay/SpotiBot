import React from 'react';
import LogoBrand from '../components/LogoBrand.jsx';

// Prompts users to link their spotify account + initiates oauth
export default function LinkSpotify() {
  return (
    <div className="flex border-bg">
      <div className="nav-bg">
        <LogoBrand />
      </div>
      <main className="main-bg">
        <a href="/login">
          <button id="link-btn">Link Your Spotify Account</button>
        </a>
      </main>
    </div>
  );
}