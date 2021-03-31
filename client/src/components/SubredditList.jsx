import React, { useState, useEffect } from 'react';
import AddSubreddit from './AddSubreddit.jsx';

const SubredditList = ({ selected, data, setData }) => {
  const [subreddits, setSubreddits] = useState(data[selected].subreddits);
  const [clicked, setClick] = useState(true);

  useEffect(() => {
    setSubreddits(data[selected].subreddits);
  }, [selected, clicked]);

  console.log(data);
  return (
    <div id="subreddit-list-container">
      <ul>
        { subreddits.map(sub => <li key={sub}>{sub}</li>) }
      </ul>

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