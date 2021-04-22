// Libraries + dependencies
import React, { useState, useEffect } from 'react';
import { useSpotify } from '../contexts/SpotifyContext.js';
import AddSubreddit from './AddSubreddit.jsx';
import RunBot from './RunBot.jsx';
// { token, selected, data, setData }
const SubredditList = () => {
  const { selected, SpotifyAPI } = useSpotify();
  const [selectedInfo, setSelectedInfo] = useState();
  const [subreddits, setSubreddits] = useState();
  // const [clicked, setClick] = useState(true);

  // Fetches + updates displayed subreddits & playlist info
  useEffect(() => {
    if (selected) {
      setSubreddits(selected.subreddits);
      SpotifyAPI.getPlaylist(selected.id)
        .then(resp => setSelectedInfo(resp))
        .catch(err => console.log(err))
    }
  }, [selected]);

  return (
    <>
      { !selectedInfo ? null : (
        <>
          <div id="subreddits-header">
            { selectedInfo.images.length === 0 ? null : (
              <img id="selected-playlist-img" src={selectedInfo.images[1].url } />
            ) }
          </div>

          <div id="selected-info">
            <h2>{selected.name}</h2>
            <p>{ selectedInfo.description }</p>
            <div> Followers: { selectedInfo.followers.total }</div>
          </div>
          <RunBot subreddits={subreddits} />

          <div id="subreddits-container">
            <h2>Subreddits in { selected.name }</h2>
            <div id="subreddits-main">
              { selected.subreddits.map(sub => (
                <div className="subreddit-tile" key={sub}>{sub}</div>
              )) }
            </div>
          </div>
          <AddSubreddit />
        </>
      ) }
    </>

  );
}

export default SubredditList;

 // <div>
      // { !selectedInfo ? null : (
      //   <div id="subreddits-header">
      //     { selectedInfo.images.length === 0 ? null : (
      //       <img id="selected-playlist-img" src={selectedInfo.images[1].url } />
      //     ) }
 // <div id="selected-info">
          //   <h2>{selected}</h2>
          //   <p>{ selectedInfo.description }</p>
          //   <div> Followers: { selectedInfo.followers.total }</div>
            // <RunBot
            //   token={token}
            //   playlistID={data[selected].id}
            //   subreddits={subreddits}
            //   setClick={setClick}
            // />
    //       </div>
    //     </div>
    //   ) }
    // <div id="subreddits-container">
      //   <h2>Subreddits in { selected }</h2>
      //   <div id="subreddits-main">
      //     { subreddits.map(sub => <div className="subreddit-tile" key={sub}>{sub}</div>) }
      //   </div>
      // </div>

      // <AddSubreddit
      //   selected={selected}
      //   data={data}
      //   setData={setData}
      //   setClick={setClick}
      // />
    // </div>