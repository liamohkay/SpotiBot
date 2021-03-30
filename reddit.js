
/*
Some ex cases that these functions handle & why removing tags improves spotify serchability
- (ft | feat. <artist name>)
- (moodyman's mix)
- [jensen interceptor edit]
- [black loops dub]
- (mall grab extended mix)

1. I am trying to clean post titles to the closet possible form of [artist] - [track].
2. Searching w/ features only add's more variability, chance for typos etc to plug into a
   Spotify serach. Since artist and track name are the only real relevant pieces of information
   of information to find a song, this adds a cost to searchability w/o benefit
3. Edits, mixes (people will post 1hr long mixes), dubs are usually almost never on Spotify.
   Therefore removing these tags as well improve searchability

These mesausres and their sepcificity are necessary b/c in subreddits w/out strict [artist] - [name] posting rules,
important / relevant info can sometimes be included insdie brackets or parentheses. Therefore doing a regex to remove all
text included inside brackets / parentheses could hinder / remove possible search matches in Spotify.
*/

// Libraries
const axios = require('axios');

// Retreives top posts from user specified subreddit. n & time default to 10 & 'week'
const getTopPosts = (subreddit, callback, n=10, time='week') => {
  axios.get(`https://www.reddit.com/r/${subreddit}/top/.json?t=${time}`)
    .then(resp => callback(resp.data.data.children))
    .catch(err => console.log(err))
};

// Removes tags (ft <artist>) and [feat <artist>] from title (these kill search result accuracy)
const removeFeatures = title => title.replace(/[([](FEAT|FT).*[\)\]]/i, '');
// Removes tags with "extended" enclosed by () or []
const removeExtended = title => title.replace(/[([](EXTENDED).*[\)\]]/i, '');
// Removes tags with "version" enclosed by () or []
const removeVersion = title => title.replace(/[([](VERSION).*[\)\]]/i, '');
// Removes years with similar format to (19yy) or [20yy] from titles
const removeYears = title => title.replace(/[([](19\d{2}|20\d{2})[\)\]]/i, '');
// Removes tags with "mix" enclosed by () or [] - note the mandatory space char b/c we do not want to remove remixes
const removeMix = title => title.replace(/[([].*\s{1,5}MIX.*[\)\]]/i, '');
// Removes tags with "edit" enclosed by () or []
const removeEdit = title => title.replace(/[([].*\s{1,5}(VIP|DUB|EDIT)[\)\]]/i, '');
// Removes any extra text that may be included in post (some subreddits worse than others)
const removeText = title => title.replace(/[([][A-z+&?!./\s]*[\)\]]/i, '');
// Removes extraneous punctuation & escape characters
const removePunc = title => title.replace(/['"\\]/g, '');

// Wrapper helpfunction that combines applies all helper functions above in one fn
const cleanPostTitle => title => {
  return title
    .removeFeatures()
    .removeExtended()
    .removeVersion()
}


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