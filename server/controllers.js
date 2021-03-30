// Libraries
const axios = require('axios');
const config = require('./config.js');
const querystring = require('querystring');

// Helper function to generate cookie
const generateRandomString = function(length) {
  let text = '';
  const possible ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

module.exports = {
  login: (req, res) => {
    let state = generateRandomString(16);
    res.cookie('spotify_auth_state', state);
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: config.client_id,
        redirect_uri: config.redirect_uri,
        state: state
      }));
  }
}