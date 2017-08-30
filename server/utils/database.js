const SQLite = require('better-sqlite3');
const config = require('../config');

module.exports = {
  db: null,
  connect(path = config.db.path) {
    this.db = new SQLite(path);

    return this.db;
  },
  close() {
    this.db.close();
    this.db = null;
  },
  getDb() {
    if (!this.db) {
      this.connect();
    }

    return this.db;
  }
};
