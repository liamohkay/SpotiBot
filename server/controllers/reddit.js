const axios = require('axios');

// Functions to clean up reddit post titles
const removeFeatures = title => title.replace(/[([](FEAT|FT).*[\)\]]/i, '');
const removeExtended = title => title.replace(/[([](EXTENDED).*[\)\]]/i, '');
const removeVersion = title => title.replace(/[([](VERSION).*[\)\]]/i, '');
const removeYears = title => title.replace(/[([](19\d{2}|20\d{2})[\)\]]/i, '');
const removeMix = title => title.replace(/[([].*\s{1,5}MIX.*[\)\]]/i, '');
const removeEdit = title => title.replace(/[([].*\s{1,5}(VIP|DUB|EDIT)[\)\]]/i, '');
const removeText = title => title.replace(/[([][A-z+&?!./\s]*[\)\]]/i, '');
const removePunc = title => title.replace(/['"\\]/g, '');

const cleanPostTitle = title => {
  title = removeFeatures(title)
  title = removeExtended(title);
  title = removeVersion(title);
  title = removeYears(title);
  title = removeMix(title);
  title = removeEdit(title);
  title = removeText(title);
  title = removePunc(title);
  return title;
};

// Splits post titles in format <artist> - <track> and returns an object
const getArtistTrackObj = title => {
  let titleSplit = title.split('-');
  if (titleSplit.length === 1) return null;
  return {
    artist: titleSplit[0].trim(),
    track: titleSplit[1].trim()
  }
};

// Retreives top posts from specified subreddit. Time horizon default = 'week'.
const getTopPosts = (subreddit, callback, time='week') => {
  let topPosts = [];

  axios.get(`https://www.reddit.com/r/${subreddit}/top/.json?t=${time}`)
    .catch(err => console.log(err))
    .then(resp => resp.data.data.children)
    .then(posts => {
      for (post in posts) {
        let title = cleanPostTitle(posts[post].data.title);
        let artistTrackObj = getArtistTrackObj(title);
        if (!artistTrackObj) continue;
        topPosts.push(artistTrackObj);
      }
      callback(topPosts)
    });
};

module.exports = {
  getTopPosts
}