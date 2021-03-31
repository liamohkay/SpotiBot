import React, { useState } from 'react';
import AddSubreddit from './AddSubreddit.jsx';

const SubredditList = ({ selected, data, setData }) => {
  const { id, subreddits } = selected;
  return (
    <div id="subreddit-list-container">
      <ul>
        { Object.keys(subreddits).map(sub => <li key={sub}>{sub}</li>) }
      </ul>
      <AddSubreddit data={data} setData={setData}/>
    </div>
  );
}

export default SubredditList;