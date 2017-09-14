const bcrypt = require('bcrypt');
const SQLite = require('better-sqlite3');
const boolConvert = require('./boolConvert');

const {
  path,
  opts
} = require('../config').db;

/**
 * Wrapper for SQLite db with helper functions
 * specific to the app
 */
class SQLiteDatabase {
  constructor(dbPath, dbOpts) {
    this.db = new SQLite(dbPath, dbOpts);
  }

  /**
   * Create needed tables/columns
   */
  init() {
    this.db.prepare(
      'CREATE TABLE IF NOT EXISTS users ' +
      '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, password TEXT NOT NULL, ' +
      'admin TEXT NOT NULL, test TEXT NOT NULL)'
    ).run();
  }

  /**
   * Remove a table from db
   * @param table - name of the table
   */
  drop(table) {
    return this.db.prepare(`DROP TABLE IF EXISTS ${table}`).run();
  }

  /**
   * Check if a user exists in the 'users' table
   * @param username - username of the user
   * @returns {boolean} - returns true if user is found, else false
   */
  userExists(username) {
    return !!this.db.prepare(`SELECT id FROM users WHERE users.name = '${username}' COLLATE NOCASE LIMIT 1`).get();
  }

  /**
   * Get all user information
   * @param username - username of the user
   * @returns {boolean} - returns a object of all the users data or false
   */
  getUser(username) {
    return this.db.prepare(`SELECT * FROM users WHERE users.name = '${username}' LIMIT 1`).get() || false;
  }

  /**
   * Get all users in the 'users' table
   */
  getAllUsers() {
    return this.db.prepare('SELECT id, name, admin, test FROM users').all();
  }

  /**
   * Insert a user into the 'users' table
   * @param username
   * @param password
   * @param admin - true/false if the user has admin privlidges
   * @param test - true/false, test users can't perform any actions, just view the app
   * @returns {boolean}
   */
  insertUser({ username, password, admin = false, test = false } = {}) {
    const cryptedPassword = bcrypt.hashSync(password, 10);

    this.db.prepare(
      `INSERT INTO users (name, password, admin, test) VALUES ('${username}', '${cryptedPassword}', ${boolConvert(admin)}, ${boolConvert(test)})`
    ).run();

    return true;
  }

  /**
   * Remove a user from the 'users' table
   * @param username - username of the user to remove
   */
  removeUser(username) {
    return this.db.prepare(`DELETE FROM users WHERE name='${username}'`).run();
  }
}

module.exports = new SQLiteDatabase(path, opts);
