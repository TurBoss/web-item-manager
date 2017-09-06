const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../utils/database');
const isValidToken = require('../../utils/isValidToken');

// TODO get single user - is it needed?
exports.getUser = async (req, res, next) => {
  const token = isValidToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  const users = db.getAllUsers();

  return res.json({
    success: true,
    users
  });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = db.getUser(username);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: `User: ${username} doesn't exist`
    });
  }

  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!passwordCheck) {
    return res.status(401).json({
      success: false,
      message: 'Incorrect password'
    });
  }

  // don't sign with sensitive data
  delete user.password;

  const token = jwt.sign(user, process.env.JWTSECRET, {
    expiresIn: '24h'
  });

  return res.json({
    success: true,
    message: `${username} logged in`,
    token
  });
};

exports.addUser = async (req, res, next) => {
  const token = isValidToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  const {
    username,
    password,
    admin,
    test
  } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and Password required'
    });
  }

  const exists = db.userExists(username);

  if (exists) {
    return res.status(400).json({
      success: false,
      message: 'Username already exists'
    });
  }

  db.insertUser({
    username,
    password,
    admin,
    test
  });

  return res.json({
    success: true,
    message: `${username} successfully added`
  });
};

exports.removeUser = async (req, res, next) => {
  const token = isValidToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  const username = req.params.user;

  if (!db.userExists(username)) {
    return res.status(400).json({
      success: false,
      message: `${username} doesn't exist`
    });
  }

  db.removeUser(username);

  return res.json({
    success: true,
    message: `Successfully removed user: ${username}`
  });
};
