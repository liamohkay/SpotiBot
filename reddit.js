// Libraries
const axios = require('axios');

// Retreives top posts from user specified subreddit. n & time default to 10 & 'week'
const getTopPosts = (subreddit, callback, n=10, time='week') => {
  axios.get(`https://www.reddit.com/r/${subreddit}/top/.json?t=${time}`)
    .then(resp => callback(resp.data.data.children))
    .catch(err => console.log(err))
}

const removeFeatures = title => title.replace(/[([](FEAT|FT).*[\)\]]/i, '');

getTopPosts('tech_house', resp => {
  let arr = [];
  for (post in resp) {
    let title = resp[post].data.title;
    title = removeFeatures(title);
    arr.push(title);
  }
  console.log(arr);
  // let test = resp['0'].data.title;
  // console.log(test);
});