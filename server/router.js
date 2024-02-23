const router = require('express').Router();
const { emailNewUser } = require('./controllers/gmail.js');

router
	.route('/confirmationEmail')
	.post(emailNewUser)

module.exports = router;