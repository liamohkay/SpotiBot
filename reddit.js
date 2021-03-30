// Libraries
const axios = require('axios');

// Retreives top posts from user specified subreddit. n & time default to 10 & 'week'
const getTopPosts = (subreddit, callback, n=10, time='week') => {
  axios.get(`https://www.reddit.com/r/${subreddit}/top/.json?t=${time}`)
    .then(resp => callback(resp.data.data.children))
    .catch(err => console.log(err))
};

// Removes tags (ft <artist>) and [feat <artist>] from title
const removeFeatures = title => title.replace(/[([](FEAT|FT).*[\)\]]/i, '');
// Removes tags with "extended" enclosed by () or []
const removeExtended = title => title.replace(/[([](EXTENDED).*[\)\]]/i, '');
// Removes tags with "version" enclosed by () or []
const removeVersion = title => title.replace(/[([](VERSION).*[\)\]]/i, '');
// Removes years in format (yyyy) or [yyyy] from titles
const removeYears = title => title.replace(/[([](19\d{2}|20\d{2})[\)\]]/i, '');
// Removes tags with "mix" enclosed by () or []
const removeMix = title => title.replace(/[([].*\s{1,5}MIX.*[\)\]]/i, '');
// Removes tags with "mix" enclosed by () or [] - note the mandatory space char b/c we do not want to remove remixes
const removeEdit = title => title.replace(/[([].*\s{1,5}(VIP|DUB|EDIT)[\)\]]/i, '');
// Removes any extra text that may be included in post (some subreddits worse than others)
const removeText = title => title.replace(/[([][A-z+&?!./\s]*[\)\]]/i, '');
// Removes extraneous punctuation & escape characters
const removePunc = title => title.replace(/['"\\]/g, '');

// Splits post titles in format [artist] - [track] and return an object
const getArtistTrackObj = title => {
  let titleSplit = title.split('-');
  if (titleSplit.length === 1) return null;
  return {
    artist: titleSplit[0].trim(),
    track: titleSplit[1].trim()
  }
};

getTopPosts('lofihouse', resp => {
  let arr = [];
  for (post in resp) {
    let title = resp[post].data.title;
    title = removeFeatures(title);
    title = removeExtended(title);
    title = removeYears(title);
    title = removeMix(title);
    title = removeEdit(title);
    title = removeText(title);
    title = removePunc(title);
    console.log(JSON.stringify(getArtistTrackObj(title)));
    arr.push(title);
  }
  console.log(arr);
  // let test = resp['0'].data.title;
  // console.log(test);
});