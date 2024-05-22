const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');

const app = express();
const bodyParser = express.json();

app.use(cors());
app.use(bodyParser);
app.use(express.static('public/images'));
app.use('/api', apiRouter);

module.exports = app;