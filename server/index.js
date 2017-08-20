const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRouter = require('./api/routes/userRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', userRouter);

app.listen(process.env.PORT || 55106, () => {
  /*  eslint no-console: 0  */
  console.log('Express server started');
});
