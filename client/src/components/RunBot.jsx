import React, { useState } from 'react';
import reddit from '../../../server/reddit.js';
import Spotify from 'spotify-web-api-js';
import DataFrame from 'dataframe-js';
const SpotifyAPI = new Spotify();

const RunBot = ({ token, playlist, subreddits }) => {
  const [searching, setSearching] = useState(null);
  const [render, setRender] = useState(true);
  const [trackIDs, setTrackIDs] = useState([]);
  SpotifyAPI.setAccessToken(token);

  const handleRun = (e) => {
    e.preventDefault();

    subreddits.map(sub => {
      console.log(sub);
      reddit.getTopPosts(sub, subPosts => {
        console.log(sub);
        subPosts.map((post, i) => {

          // Search by song title then check against artist name
          SpotifyAPI.searchTracks(post.track, { limit: 50 })
            .catch(err => console.log(err))
            .then(resp => {
              let trackResults = resp.tracks.items;
              trackResults.map(track => {
                if (track.artists[0].name.toLowerCase() === post.artist.toLowerCase()) {
                  setTrackIDs([...trackIDs, track.id]);
                }
              })
            })
            .then(() => {
              setSearching(`${post.artist} - ${post.track}`);
              setRender(prev => !prev);
            })
            .then(() => {
              if (i === subPosts.length - 1) {
                setSearching(null);
                setRender(prev => !prev);
              }
            })
        });
      });
    });
  }

  return (
    <div>
      { !searching ? null : <div>Searching for: { searching }</div> }
      <button id="run-bot" onClick={handleRun}>Run SpotiBot</button>
    </div>
  );
}

export default RunBot;