const router = require('express').Router();
const { emailNewUser } = require('./controllers/gmail.js');
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
	.route('/confirmationEmail')
	.post(emailNewUser)

module.exports = router;