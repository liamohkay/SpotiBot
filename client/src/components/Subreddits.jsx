// Libraries + dependencies
import React, { useState, useEffect } from 'react';
import { useSpotify } from '../contexts/SpotifyContext.js';
import AddSubreddit from './AddSubreddit.jsx';
import RunBot from './RunBot.jsx';
// { token, selected, data, setData }
const SubredditList = () => {
  const { selected, SpotifyAPI } = useSpotify();
  // const [selectedInfo, setSelectedInfo] = useState();
  // const [subreddits, setSubreddits] = useState(data[selected].subreddits);
  // const [clicked, setClick] = useState(true);

  // // Updates displayed subreddits & playlist info currently selected playlist
  // useEffect(() => {
  //   console.log(data[selected]);
  //   setSubreddits(data[selected].subreddits);
  //   SpotifyAPI.getPlaylist(data[selected].id)
  //     .catch(err => console.log(err))
  //     .then(resp => setSelectedInfo(resp))
  // }, [selected, clicked]);

  // Updates displayed subreddits & playlist info currently

  return (
    <>
      { JSON.stringify(selected) }
    </>
    // <div>
    //   { !selectedInfo ? null : (
    //     <div id="subreddits-header">
    //       { selectedInfo.images.length === 0 ? null : (
    //         <img id="selected-playlist-img" src={selectedInfo.images[1].url } />
    //       ) }

    //       <div id="selected-info">
    //         <h2>{selected}</h2>
    //         <p>{ selectedInfo.description }</p>
    //         <div> Followers: { selectedInfo.followers.total }</div>
    //         <RunBot
    //           token={token}
    //           playlistID={data[selected].id}
    //           subreddits={subreddits}
    //           setClick={setClick}
    //         />
    //       </div>
    //     </div>
    //   ) }

    //   <div id="subreddits-container">
    //     <h2>Subreddits in { selected }</h2>
    //     <div id="subreddits-main">
    //       { subreddits.map(sub => <div className="subreddit-tile" key={sub}>{sub}</div>) }
    //     </div>
    //   </div>

    //   <AddSubreddit
    //     selected={selected}
    //     data={data}
    //     setData={setData}
    //     setClick={setClick}
    //   />
    // </div>
  );
}

export default SubredditList;