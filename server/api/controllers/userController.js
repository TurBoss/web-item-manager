const bcrypt = require('bcrypt');
const users = require('../../users.json');

function userExists(user) {
  return user in users;
}

function checkPassword(username, password) {
  const hashedPassword = users[username].password;

  return bcrypt.compareSync(password, hashedPassword);
}

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!userExists(username)) {
    return res.status(401).json({
      message: `User: ${username} doesn't exist`
    });
  }

  if (!checkPassword(username, password)) {
    return res.status(401).json({
      message: 'Incorrect password'
    });
  }

  return res.json({ message: `login attempt.. ${username} .. `, password });
};
