const users = require('../../users.json');

function userExists(user) {
  return user in users;
}

function checkPassword() {

}

exports.login = (req, res) => {

};
