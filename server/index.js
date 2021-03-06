const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const config = require('./config');
require('./utils/database');
const userRouter = require('./api/routes/userRoute');

const app = express();

app.set('port', config.app.port || 55106);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', userRouter);

app.listen(app.get('port'), () => {
  /*  eslint no-console: 0  */
  console.log(`Express server started on port: ${app.get('port')}`);
});

// for testing
module.exports = app;
