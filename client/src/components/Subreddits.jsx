// Libraries + dependencies
import React, { useState, useEffect } from 'react';
import AddSubreddit from './AddSubreddit.jsx';
import RunBot from './RunBot.jsx';
import Spotify from 'spotify-web-api-js';
const SpotifyAPI = new Spotify();

const SubredditList = ({ token, selected, data, setData }) => {
  const [selectedInfo, setSelectedInfo] = useState();
  const [subreddits, setSubreddits] = useState(data[selected].subreddits);
  const [clicked, setClick] = useState(true);
  SpotifyAPI.setAccessToken(token);

  // Updates displayed subreddits & playlist info currently selected playlist
  useEffect(() => {
    setSubreddits(data[selected].subreddits);
    SpotifyAPI.getPlaylist(data[selected].id)
      .catch(err => console.log(err))
      .then(resp => {
        console.log(resp);
        setSelectedInfo(resp);
      })
  }, [selected, clicked]);

  return (
    <div id="subreddits-container">
        { !selectedInfo ? null : (
          <div id="subreddits-header">
            {/* <img id="selected-img" src={selectedInfo.images[0].url} /> */}
            <h1>
              <a href={selectedInfo.external_urls.spotify}>{selected}</a>
            </h1>
            <RunBot
              token={token}
              playlistID={data[selected].id}
              subreddits={subreddits}
            />
          </div>
        ) }
      <div id="subreddits-main">
        <h4>Subreddits in { selected }</h4>
        <ul>{ subreddits.map(sub => <li key={sub}>{sub}</li>) }</ul>
      </div>

      <AddSubreddit
        selected={selected}
        data={data}
        setData={setData}
        setClick={setClick}
      />

    </div>
  );
}

export default SubredditList;