// Libraries & dependencies
const port = 3000;
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const controllers = require('./controllers.js');

// Express server + middleware + controllers
const server = express()
  .use(cors())
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // Routes
  .get('/login', controllers.login)
  .get('/callback', controllers.callback)
  .use(express.static(path.join(__dirname, '../client/dist/')))

server.listen(port, () => console.log(`Listening on port: ${port}`));