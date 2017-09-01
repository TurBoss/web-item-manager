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
    db.init();
    db.insertUser({ name: 'test', password: '123', admin: true, test: false });
    db.insertUser({ name: 'test2', password: '123', admin: false, test: false });

    chai.request(app)
    .post('/api/user/login')
    .send({ username: 'test', password: '123' })
    .end((err, res) => {
      token += res.body.token;
      done();
    });
  });

  describe('getUser()', function(done) {
    it('should require a valid token', function(done) {
      chai.request(app)
      .get('/api/user/get')
      .send({ username: 'test', password: '123', token: 'faketoken' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    describe('get all users', function(done) {
      it('shouldn\'t return a empty list');
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
      .send({ username: 'test', password: '123', token: 'faketoken' })
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

  after(function(done) {
    db.drop();
    db.close();
    done();
  });
});
