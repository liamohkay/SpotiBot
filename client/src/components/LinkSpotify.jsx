import React from 'react';

// Prompts users to link their spotify account + initiates oauth
export default function LinkSpotify() {
  return (
    <div className="flex border-bg">
      <div className="nav-bg">

      </div>
      <main className="main-bg">
        <a href="/login">
          <button id="login-btn">Link Your Spotify Account</button>
        </a>
      </main>
    </div>
  );
}