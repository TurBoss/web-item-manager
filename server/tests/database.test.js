const chai = require('chai');
const db = require('../utils/database');

/*  eslint no-unused-vars: 0  */
const should = chai.should();

describe('database()', function() {
  describe('drop()', function() {
    before(function(done) {
      db.init();
      done();
    });

    it('should drop existing table', function(done) {
      db.drop('users');
      const res = db.db.prepare('SELECT count(*) as result FROM sqlite_master WHERE type="table" AND name="users"').get();
      res.result.should.equal(0);
      done();
    });
  });

  describe('init()', function() {
    it('should create all needed tables', function(done) {
      db.init();
      let res = db.db.prepare('SELECT count(*) as result FROM sqlite_master WHERE type="table" AND name="users"').get();
      res.result.should.equal(1);
      done();
    });
  });

  describe('insertUser()', function() {
    it('should insert encrypted password');

    it('should insert user into database', function(done) {
      db.insertUser({ username: 'dbtest', password: '123', admin: true, test: false });
      const res = db.getUser('dbtest');
      res.name.should.equal('dbtest');
      done();
    });

    after(function(done) {
      db.removeUser('dbtest');
      done();
    });
  });

  describe('userExists()', function() {
    before(function(done) {
      db.insertUser({ username: 'dbtest', password: '123', admin: true, test: false });
      done();
    });

    it('should return true for existing user', function(done) {
      const res = db.userExists('dbtest');
      res.should.equal(true);
      done();
    });

    it('should return false for non-existing user', function(done) {
      const res = db.userExists('fakename');
      res.should.equal(false);
      done();
    });

    after(function(done) {
      db.removeUser('dbtest');
      done();
    });
  });

  describe('getUser()', function() {
    before(function(done) {
      db.insertUser({ username: 'dbtest', password: '123', admin: true, test: false });
      done();
    });

    it('should return an existing user', function(done) {
      const res = db.getUser('dbtest');
      res.name.should.equal('dbtest');
      res.admin.should.equal('1');
      done();
    });

    it('should return false if user doesn\'t exist', function(done) {
      const res = db.getUser('noexist');
      res.should.equal(false);
      done();
    });

    after(function(done) {
      db.removeUser('dbtest');
      done();
    });
  });

  describe('getAllUsers()', function() {
    before(function(done) {
      db.drop('users');
      db.init();
      done();
    });

    it('should return false if there is no users', function(done) {
      const res = db.getAllUsers();
      res.should.deep.equal([]);
      done();
    });

    it('should return array of all users', function(done) {
      db.insertUser({ username: 'test3', password: '123', admin: true, test: false });
      db.insertUser({ username: 'test4', password: '123', admin: false, test: false });
      const res = db.getAllUsers();
      res.length.should.equal(2);
      done();
    });

    after(function(done) {
      db.removeUser('test3');
      db.removeUser('test4');
      done();
    });
  });

  describe('removeUser()', function() {
    it('should remove an existing user', function(done) {
      db.insertUser({ username: 'dbtest', password: '123', admin: true, test: false });
      let res = db.userExists('dbtest');
      res.should.equal(true);
      db.removeUser('dbtest');
      res = db.userExists('dbtest');
      res.should.equal(false);
      done();
    });
  });

  after(function(done) {
    db.init();
    db.insertUser({ username: 'test', password: '123', admin: true, test: false });
    db.insertUser({ username: 'test2', password: '123', admin: false, test: false });
    done();
  });
});
