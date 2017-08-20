const users = require('../../users.json');

function userExists(user) {
  return user in users;
}

function checkPassword() {

}

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!userExists(username)) {
    return res.json.status(401).json({
      message: `user: ${username} doesn't exist`
    });
  }

  res.json({ message: `login attempt.. ${username} .. ${msg}`, password });
};
