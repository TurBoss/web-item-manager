const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../');

/*  eslint no-unused-vars: 0  */
const should = chai.should();

chai.use(chaiHttp);

describe('userController', () => {
  describe('login controller', () => {
    it('should fail if username wasn\'t found', (done) => {
      chai.request(app)
      .post('/api/user/login')
      .send({ username: 'fakename' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('User: fakename doesn\'t exist');
        done();
      });
    });

    it('should fail if password doesn\'t match', (done) => {
      chai.request(app)
      .post('/api/user/login')
      .send({ username: 'test', password: 'fake' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Incorrect password');
        done();
      });
    });

    it('should return a token if successful', (done) => {
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

  describe('addUser controller', () => {
    let token = 'Bearer ';

    before((done) => {
      chai.request(app)
      .post('/api/user/login')
      .send({ username: 'test', password: '123' })
      .end((err, res) => {
        token += res.body.token;
        done();
      });
    });

    it('should require a valid token', (done) => {
      chai.request(app)
      .post('/api/user/add')
      .send({ username: 'test', password: '123', token: 'faketoken' })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });

    it('should require a username and password', (done) => {
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

    it('shouldn\'t add duplicate usernames', (done) => {
      chai.request(app)
      .post('/api/user/add')
      .set('Authorization', token)
      .send({ username: 'Test account', password: 'fake' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('Username already exists');
        done();
      });
    });
  });
});
