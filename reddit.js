// Libraries
const axios = require('axios');

// Retreives top posts from user specified subreddit. n & time default to 10 & 'week'
const getTopPosts = (subreddit, n=10, time='week') => {
  axios.get(`https://www.reddit.com/r/${subreddit}/top/.json?t=${time}`)
    .then(resp => console.log(resp.data.data.children))
    .catch(err => console.log(err))
}

getTopPosts('house');