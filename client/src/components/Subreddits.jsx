// Libraries, dependencies, contexts
import React, { useState, useEffect } from 'react';
import { db } from '/client/src/firebase/firebase.js';
import { useSpotify } from '/client/src/contexts/SpotifyContext.js';
// Components
import RunBot from '/client/src/components/RunBot.jsx';
import AddSubreddit from '/client/src/components/AddSubreddit.jsx';

export default function SubredditList() {
  const { selected, getSelectedPlaylist, SpotifyAPI } = useSpotify();
  const [selectedPlaylist, setSelectedPlaylist] = useState();

  // Fetches + updates displayed subreddits & playlist info
  useEffect(() => {
    if (selected) {
      SpotifyAPI.getPlaylist(selected.id)
        .then(resp => setSelectedPlaylist(resp))
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
      { !selectedPlaylist ? null : (
        <section id="subreddits">
          <h2>Indexed Subreddits</h2>
          <div id="subreddit-tile-list" className="flex">
            {selected.subreddits.map(sub => (
              <div className="subreddit-tile flex" onClick={handleDelete} key={sub}>{sub}</div>
            ))}
          </div>
          <AddSubreddit />
        </section>
      ) }
    </>
  );
}