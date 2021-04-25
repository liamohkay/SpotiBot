import React from 'react';

// Prompts users to link their spotify account + initiates oauth
export default function LinkSpotify() {
  return (
    <div className="container flex">
      <div id="link-spotify-card" className="flex">
        <h1>SpotiBot</h1>
        <a href="/login">
          <button id="login-btn">Link Your Spotify Account</button>
        </a>
      </div>
    </div>
  );
}