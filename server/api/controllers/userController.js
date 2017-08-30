const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../utils/database').getDb();
const isValidToken = require('../../utils/isValidToken');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = db.prepare(`SELECT id, name, password FROM users WHERE users.name = '${username}'`).get();

  if (!user) {
    return res.status(401).json({
      message: `User: ${username} doesn't exist`
    });
  }

  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!passwordCheck) {
    return res.status(401).json({
      message: 'Incorrect password'
    });
  }

  const payload = {
    username,
    id: user.id
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

exports.addUser = async (req, res, next) => {
  const token = isValidToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and Password required'
    });
  }

  const exists = db.prepare(`SELECT id FROM users WHERE users.name = '${username}' COLLATE NOCASE`).get();

  if (exists) {
    return res.status(400).json({
      message: 'Username already exists'
    });
  }

  const cryptedPassword = await bcrypt.hash(password, 10);

  db.prepare(`INSERT INTO users (name, password) VALUES ('${username}', '${cryptedPassword}')`).run();

  return res.json({
    success: true,
    message: `${username} successfully added`
  });
};
