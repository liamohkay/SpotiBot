// Libraries
const axios = require('axios');

// Retreives top posts from user specified subreddit. n & time default to 10 & 'week'
const getTopPosts = async (subreddit, n=10, time='week') => {
  return await axios.get(`https://www.reddit.com/r/${subreddit}/top/.json?t=${time}`)
    .then(resp => console.log(resp.data.data.children))
    .catch(err => console.log(err))
}

let data = getTopPosts('house');
console.log(data);