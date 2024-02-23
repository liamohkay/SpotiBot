require('dotenv').config();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./router.js');

// Global vars
const port = process.env.PORT || 3000;

// Express server + middleware + controllers
const app = express()
  .use(cors())
  .use(cookieParser())
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, '../client/dist/')))
  .use(router)

app.listen(port, () => console.log(`Listening on port: ${port}`));
