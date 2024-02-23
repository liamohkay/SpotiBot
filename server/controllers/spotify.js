require('dotenv').config();
const axios = require('axios');
const request = require('request');
const querystring = require('querystring');

// Helper function for state serialization
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Initiate spotify OAuth
const getSpotifyLogin = async (req, res) => {
  let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  let state = generateRandomString(16);
  res.cookie('spotify_auth_state', state);

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URI,
      state: state
    })
  );
}

// Get access token using OAuth
const getSpotifyAcccessToken = async (req, res) => {
  let code = req.query.code || null;
  let storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;
  res.clearCookie('spotify_auth_state');

  let authOptions = {
    json: true,
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
    },
    form: {
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    },
  };

  request.post(authOptions, (err, resp, body) => {
    if (!err && resp.statusCode === 200) {
      let access_token = body.access_token;
      let refresh_token = body.refresh_token;

      let options = {
        json: true,
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      };

      // use the access token to access the Spotify Web API
      // request.get(options, (err, resp, body) => console.log(body));
      res.redirect('/#' + querystring.stringify({ access_token, refresh_token }));
    } else {
      res.redirect('/#' + querystring.stringify({ err: 'invalid_token' }));
    }
  });
}

const getSpotifyRefreshToken = async (req, res) => {
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    json: true,
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
}

module.exports = {
  getSpotifyLogin,
  getSpotifyAcccessToken,
  getSpotifyRefreshToken
}