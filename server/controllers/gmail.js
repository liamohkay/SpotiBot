require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Email templates & text -> email function
const emailTemplates = {
  signup: {
    subject: (req) => `Welcome to SpotiBot ${req.body.name}!`,
    html: (req) => `<h3>Thank you for signing up for SpotiBot ${req.body.name}</h3>\n<p>${req.body.email} is your login ID. You can navigate to <a href="http://localhost:3000>SpotiBot</a> to start finding tracks!</p>`
  },
  signin: {
    subject: (req) => `${req.body.name} did you just sign into SpotiBot?`,
    html: (req) => `If this wasn't you (${req.body.email}) please ask the dev to build out reporting functionality.`
  }
}

const polyfillEmail = (req) => {
  let emailFields = emailTemplates[req.body.template];
  for (field in emailFields) {
    emailFields[field] = emailFields[field](req);
  }
  return emailFields;
}

// Initialize gmail oauthclient & set token
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_ID,
  process.env.GMAIL_SECRET,
  'https://developers.google.com/oauthplayground'
)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const postEmail = async (req, res) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_EMAIL,
        clientId: process.env.GMAIL_ID,
        clientSecret: process.env.GMAIL_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      }
    })

    const emailText = polyfillEmail(req);
    const mailOptions ={
      from: process.env.GMAIL_EMAIL,
      to: req.body.email,
      subject: emailText.subject,
      html: emailText.html
    }

    const result = await transporter.sendMail(mailOptions);
    res.status(200).send(`Signup confirmation sent to: ${req.body.email}.`);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports = {
  postEmail
}