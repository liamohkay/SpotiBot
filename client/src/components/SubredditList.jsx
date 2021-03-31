import React, { useState } from 'react';
import AddSubreddit from './AddSubreddit.jsx';

const SubredditList = ({ data, setData }) => {
  return (
    <div id="subreddit-list-container">
      <AddSubreddit data={data} setData={setData}/>
    </div>
  )
}

export default SubredditList;