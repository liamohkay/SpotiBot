// Libraries, dependencies, contexts
import React, { useState, useEffect } from 'react';
import { db } from '/client/src/firebase/firebase.js';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';
// Components
import RunBot from '/client/src/components/RunBot.jsx';
import AddSubreddit from '/client/src/components/AddSubreddit.jsx';

export default function SubredditList() {
  const { selected, getSelectedPlaylist, SpotifyAPI } = useSpotify();
  const [selectedInfo, setSelectedInfo] = useState();

  // Fetches + updates displayed subreddits & playlist info
  useEffect(() => {
    if (selected) {
      SpotifyAPI.getPlaylist(selected.id)
        .then(resp => setSelectedInfo(resp))
        .catch(err => console.log(err))
    }
  }, [selected]);

  // Deletes subreddit on tile click
  const handleDelete = (e) => {
    let index = selected.subreddits.indexOf(e.target.innerText);
    selected.subreddits.splice(index, 1);

    db.collection('playlists').doc(selected.id).set({
      subreddits: selected.subreddits
    }, { merge: true })
      .then(() => getSelectedPlaylist())
      .catch(err => alert(`Subreddit could not be removed from ${selcted.name}`))
  }

  return (
    <>
      {!selectedInfo ? null : (
        <div id="selected-playlist" className="flex">
          <div id="selected-playlist-header" className="flex">
            <RunBot subreddits={selected.subreddits} />
            {selectedInfo.images.length === 0
              ? <img src="https://i1.wp.com/hertrack.com/wp-content/uploads/2018/10/no-image.jpg?w=1000&ssl=1"/>
              : <img src={selectedInfo.images[1].url} />
            }
            <div id="selected-playlist-info" className="flex">
              <div>
                <h1>{selected.name}</h1>
                <div>Followers: {selectedInfo.followers.total}</div>
                <br/>
                <p>{selectedInfo.description}</p>
              </div>
            </div>
          </div>

          <div id="subreddits">
            <div className="flex">
              <h1>Subreddits in {selected.name}</h1>
              <div id="subreddit-tile-list" className="flex">
                {selected.subreddits.map(sub => (
                  <div className="subreddit-tile" onClick={handleDelete} key={sub}>{sub}</div>
                ))}
              </div>
            </div>
            <AddSubreddit />
          </div>
        </div>
      )}
    </>
  );
}