# SpotiBot Table Of Contents
1. [Overview](#Overview)
1. [Technologies](#Technologies)
1. [Installation](#Installation)
1. [Setup](#Setup)
1. [Run SpotiBot](#RunSpotiBot)

# Overview
SpotiBot is a web application that leverages the constant stream of new music posted to Reddit and combines it with the listening convenience of Spotify.

SpotiBot aggregates top music posts from user-inputted subreddits, searches for the corresponding songs on Spotify, and then adds the songs to a single Spotify playlist. SpotiBot alleviates the painstaking process of visiting a sundry of different subreddits and clicking through multiple external links just to listen to a song.

![](https://firebasestorage.googleapis.com/v0/b/spotibot-5d612.appspot.com/o/SpotiBot.gif?alt=media&token=cb892c74-3608-4d21-89fe-e919ad4f11f6)

# Technologies
- HTML + CSS
- React
- JavaScript
- Express
- [Reddit Public API](https://www.reddit.com/dev/api/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) (Premium Required)
- [Firestore](https://firebase.google.com/docs/firestore) (Cloud NoSQL Database)
- [Firebase Authentication](https://firebase.google.com/docs/auth) (User Authentication)

# Installation
1. Clone down the latest version of SpotiBot from GitHub and navigate to the project directory.
```
$ git clone https://github.com/liamohkay/SpotiBot.git
$ cd SpotiBot
```
2. Using install project dependencies inside the SpotiBot directory.
```
$ npm install
```

# Setup

## Spotify API Key
1. Sign up for a [Spotify Developer Account](https://developer.spotify.com/dashboard/) and create a new web app.

2. Click **Edit Settings** in your application and save `http://localhost:3000/callback` (for local development) in the **Rdirect URIs** section. *Note:* It is vital that the Redirect URI you save on Spotify matches the `redirect_uri` in your `spotifyConfig-ex.js` file.

3. Copy and paste your app's Client ID & Client Secret to the respective fields in `/server/spotifyConfig-ex.js`.
```
// Spotify API Config
module.exports = {
    redirect_uri: 'http://localhost:3000/callback',
    client_id: 'INSERT SPOTIFY APP CLIENT ID',
    client_secret: 'INSERT SPOTIFY APP CLIENT SECRET'
};
```

4. Rename `/server/spotifyConfig-ex.js` to `/server/spotifyConfig.js`. Renaming the file will cause it to become gitignored and is the correct filepath for the express server to import your Spotify configuration.

## Firebase/Firestore
1. Sign up for a [Firebase](https://firebase.google.com/) account and create a new project.

2. Add Firebase to your web app and copy and paste the Firebase SDK configuration settings to `/client/src/firebase/fbConfig-ex.js`
```
// Firebase + Firestore SDK config
const firebaseConfig = {
  apiKey: "FILL_ME_IN",
  authDomain: "FILL_ME_IN",
  projectId: "FILL_ME_IN",
  storageBucket: "FILL_ME_IN",
  messagingSenderId: "FILL_ME_IN",
  appId: "FILL_ME_IN"
};
```

3.  Rename `/client/src/firebase/fbConfig-ex.js` to `/client/src/firebase/fbConfig.js`. Renaming the file will cause it to become gitignored and is the correct filepath for the front-end to import your Firebase configuration.

# Run SpotiBot
1. Compile the project build.
```
$ npm run build
```
2. Start the express server.
```
$ npm start
```
3. Navigate to the localhost port in your browser. The project default is `localhost:3000`.

