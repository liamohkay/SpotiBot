require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Initialize oauthclient & set token
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_ID,
  process.env.GMAIL_SECRET,
  'https://developers.google.com/oauthplayground'
)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const emailNewUser = async (req, res) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      dubgger: true,
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_EMAIL,
        clientId: process.env.GMAIL_ID,
        clientSecret: process.env.GMAIL_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      }
    })

    const mailOptions ={
      from: process.env.GMAIL_EMAIL,
      to: req.body.email, // this can also be multiple senders
      subject: 'Welcome to SpotiBot!',
      html: '<h3>Thank you for signing up for SpotiBot.</3>'
    }

    const result = await transporter.sendMail(mailOptions);
    res.status(200).send(`Signup confirmation sent to: ${req.body.email}.`);

  } catch(err) {
    res.status(400).send(err);
    return err;
  }
}

module.exports = {
  emailNewUser
}