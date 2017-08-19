const express = require('express');
const bcrypt = require('bcrypt');
const fse = require('fs-extra');

const app = express();

/*
const addHash = async () => {
  const hash = await bcrypt.hash('jesshockey692222', 10);
  const data = await fse.readJson('./server/users.json');

  data.notvita.password = hash;

  await fse.writeJson('./server/users.json', data);
};

addHash().then(() => console.log('yaaa'));

*/

/*  eslint no-console: 0  */
app.listen(process.env.PORT || 6922, () => {
  console.log('Express server started');
});
