const bcrypt = require('bcrypt');
const SQLite = require('better-sqlite3');
const boolConvert = require('./boolConvert');

const {
  path,
  opts
} = require('../config').db;

class SQLiteDatabase {
  constructor(dbPath, dbOpts) {
    this.db = new SQLite(dbPath, dbOpts);
  }

  init() {
    this.db.prepare(
      'CREATE TABLE users ' +
      '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, password TEXT NOT NULL, ' +
      'admin TEXT NOT NULL, test TEXT NOT NULL)'
    ).run();
  }

  drop() {
    this.db.prepare('DROP TABLE users').run();
  }

  insertUser({ username, password, admin = false, test = false } = {}) {
    const cryptedPassword = bcrypt.hashSync(password, 10);

    this.db.prepare(
      `INSERT INTO users (name, password, admin, test) VALUES ('${username}', '${cryptedPassword}', ${boolConvert(admin)}, ${boolConvert(test)})`
    ).run();

    return true;
  }
}

module.exports = new SQLiteDatabase(path, opts);
