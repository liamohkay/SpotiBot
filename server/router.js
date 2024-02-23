const router = require('express').Router();
const { postEmail } = require('./controllers/gmail.js');
const { getSpotifyLogin, getSpotifyAcccessToken, getSpotifyRefreshToken } = require('./controllers/spotify.js');

// Spotify OAuth endpoints
router
	.route('/login')
	.get(getSpotifyLogin)
router
	.route('/callback')
	.get(getSpotifyAcccessToken)
router
	.route('/refresh_token')
	.get(getSpotifyRefreshToken)

// Gmail OAuth endpoints
router
	.route('/email')
	.post(postEmail)

module.exports = router;