const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fse = require('fs-extra');
const config = require('../../config');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const users = await fse.readJSON(config.db.users);

  const usernameCheck = username in users;

  if (!usernameCheck) {
    return res.status(401).json({
      message: `User: ${username} doesn't exist`
    });
  }

  const passwordCheck = await bcrypt.compare(password, users[username].password);

  if (!passwordCheck) {
    return res.status(401).json({
      message: 'Incorrect password'
    });
  }

  const payload = {
    username,
    group: users[username].group
  };

  const token = jwt.sign(payload, process.env.JWTSECRET, {
    expiresIn: '24h'
  });

  return res.json({
    success: true,
    message: `${username} logged in`,
    token
  });
};

exports.logout = () => {
  return true;
};
