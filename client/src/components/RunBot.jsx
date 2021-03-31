import React, { useState } from 'react';
import reddit from '../../../server/reddit.js';
import Spotify from 'spotify-web-api-js';
import DataFrame from 'dataframe-js';
const SpotifyAPI = new Spotify();

const RunBot = ({ token, selected, subreddits }) => {
  const [trackIDs, setTrackIDs] = useState([]);
  SpotifyAPI.setAccessToken(token);

  const handleRun = (e) => {
    e.preventDefault();

    subreddits.map(sub => {
      reddit.getTopPosts(sub, subPosts => {
        // Search for song artist & name then compare reults
        subPosts.map(post => {
          SpotifyAPI.searchTracks(post.track, { limit: 50 })
            .catch(err => console.log(err))
            .then(resp => {
              let trackResults = resp.tracks.items;
              trackResults.map(track => {
                if (track.artists[0].name.toLowerCase() === post.artist.toLowerCase()) {
                  setTrackIDs([...trackIDs, track.id]);

                }
              });
            })
        });
      });
    });
  }

  return (
    <div>
      <button id="run-bot" onClick={handleRun}>Run SpotiBot</button>
    </div>
  );
}

export default RunBot;