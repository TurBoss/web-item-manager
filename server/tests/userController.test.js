const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../');
const db = require('../utils/database');

/*  eslint no-unused-vars: 0  */
const should = chai.should();

chai.use(chaiHttp);

describe('userController()', function() {
  let token = 'Bearer ';

  before(function(done) {
    chai.request(app)
    .post('/api/user/login')
    .send({ username: 'test', password: '123' })
    .end((err, res) => {
      token += res.body.token;
      done();
    });
  });

  describe('getUser()', function() {
    it('should require a valid token', function(done) {
      chai.request(app)
      .get('/api/user/get')
      .send({ username: 'test', password: '123' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    describe('get all users', function() {
      it('should return a users list', function(done) {
        chai.request(app)
        .get('/api/user/get')
        .set('Authorization', token)
        .send({ username: 'test', password: '123' })
        .end((err, res) => {
          res.body.success.should.equal(true);
          res.body.should.have.property('users');
          res.body.users.length.should.equal(2);
          done();
        });
      });
    });
  });

  describe('login()', function() {
    it('should fail if username wasn\'t found', function(done) {
      chai.request(app)
      .post('/api/user/login')
      .send({ username: 'fakename' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('User: fakename doesn\'t exist');
        done();
      });
    });

    it('should fail if password doesn\'t match', function(done) {
      chai.request(app)
      .post('/api/user/login')
      .send({ username: 'test', password: 'fake' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Incorrect password');
        done();
      });
    });

    it('should return a token if successful', function(done) {
      chai.request(app)
      .post('/api/user/login')
      .send({ username: 'test', password: '123' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.equal(true);
        res.body.should.have.property('token');
        done();
      });
    });
  });

  describe('addUser()', function() {
    it('should require a valid token', function(done) {
      chai.request(app)
      .post('/api/user/add')
      .send({ username: 'test', password: '123' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    it('should require a username and password', function(done) {
      chai.request(app)
      .post('/api/user/add')
      .set('Authorization', token)
      .send({ username: 'test' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('Username and Password required');
        done();
      });
    });

    it('shouldn\'t add duplicate usernames', function(done) {
      chai.request(app)
      .post('/api/user/add')
      .set('Authorization', token)
      .send({ username: 'test', password: 'fake' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('Username already exists');
        done();
      });
    });

    it('should add a user to database');
  });
});
