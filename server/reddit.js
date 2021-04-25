// Libraries
const axios = require('axios');

// Removes tags (ft <artist>) and [feat <artist>] from title (these kill search result accuracy)
const removeFeatures = title => title.replace(/[([](FEAT|FT).*[\)\]]/i, '');
// Removes tags with "extended" enclosed by () or []
const removeExtended = title => title.replace(/[([](EXTENDED).*[\)\]]/i, '');
// Removes tags with "version" enclosed by () or []
const removeVersion = title => title.replace(/[([](VERSION).*[\)\]]/i, '');
// Removes tags with release year in formats similar to (19yy) or [20yy] from titles
const removeYears = title => title.replace(/[([](19\d{2}|20\d{2})[\)\]]/i, '');
// Removes tags with "mix" enclosed by () or [] - note space char do not want to remove remixes
const removeMix = title => title.replace(/[([].*\s{1,5}MIX.*[\)\]]/i, '');
// Removes tags with "edit" enclosed by () or []
const removeEdit = title => title.replace(/[([].*\s{1,5}(VIP|DUB|EDIT)[\)\]]/i, '');
// Removes any extra text that may be included in post (some subreddits worse than others)
const removeText = title => title.replace(/[([][A-z+&?!./\s]*[\)\]]/i, '');
// Removes extraneous punctuation & escape characters
const removePunc = title => title.replace(/['"\\]/g, '');

// Wrapper helper function that applies all helper functions above in one fn
const cleanPostTitle = title => {
  title = removeFeatures(title)
  title = removeExtended(title);
  title = removeVersion(title);
  title = removeYears(title);
  title = removeMix(title);
  title = removeEdit(title);
  title = removeText(title);
  title = removePunc(title);
  return title; // removeText & removePunc at the end is intentional
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
      // Iterate through all posts in response & split artist - track into obj
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