const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fse = require('fs-extra');
require('dotenv').config();

const userRouter = require('./api/routes/userRoute');

const app = express();

/*
const addHash = async () => {
  const hash = await bcrypt.hash('ss', 10);
  const data = await fse.readJson('./server/users.json');

  data.notvita.password = hash;

  await fse.writeJson('./server/users.json', data);
};

addHash().then(() => console.log('yaaa'));
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', userRouter);

app.listen(process.env.PORT || 55106, () => {
  /*  eslint no-console: 0  */
  console.log('Express server started');
});
