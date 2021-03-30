// Libraries & depdencies
const axios = require('axios');
const reddit = require('./reddit.js');
const config = require('./config.js');
const spotify = require('spotify-web-api-js');

axios.get(`https://accounts.spotify.com/authorize?client_id=${config.client}&response_type=code&redirect_uri=${config.redirect_uri}`);
