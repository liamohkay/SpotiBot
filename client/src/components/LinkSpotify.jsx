import React from 'react';

// Prompts users to link their spotify account + initiates oauth
export default function LinkSpotify() {
  return (
    <div className="flex border-bg">
      <div className="nav-bg">
        <section id="login-nav-header">
          <img src="https://cdn.icon-icons.com/icons2/814/PNG/512/Spotify_icon-icons.com_66209.png" />
          <div>
            <h1>SpotiBot</h1>
            <p>The digital digger</p>
          </div>
        </section>
      </div>
      <main className="main-bg">
        {/* <div className="flex"> */}
          <a href="/login">
            <button id="link-btn">Link Your Spotify Account</button>
          </a>
        {/* </div> */}
      </main>
    </div>
  );
}