const bcrypt = require('bcrypt');
const SQLite = require('better-sqlite3');
const boolConvert = require('./boolConvert');
const config = require('../config');

module.exports = {
  db: null,
  connect(path = config.db.path) {
    this.db = new SQLite(path, {
      memory: config.db.memory
    });

    return this.db;
  },
  close() {
    this.db.close();
    this.db = null;
  },
  drop() {
    this.db.prepare('DROP TABLE users').run();
  },
  getDb() {
    if (!this.db) {
      this.connect();
    }

    return this.db;
  },
  init() {
    if (!this.db) {
      this.connect();
    }

    this.db.prepare(
      'CREATE TABLE users ' +
      '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, password TEXT NOT NULL, ' +
      'admin TEXT NOT NULL, test TEXT NOT NULL)'
    ).run();
  },
  insertUser({ name, password, admin = false, test = false } = {}) {
    const cryptedPassword = bcrypt.hashSync(password, 10);

    this.db.prepare(
      `INSERT INTO users (name, password, admin, test) VALUES ('${name}', '${cryptedPassword}', ${boolConvert(admin)}, ${boolConvert(test)})`
    ).run();

    return true;
  }
};
