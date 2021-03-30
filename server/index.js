// Libraries & dependencies
const port = 3000;
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

// Express server + middleware
const server = express()
  .use(cors())
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, '../client/dist/')))

server.listen(port, () => console.log(`Listening on port: ${port}`));