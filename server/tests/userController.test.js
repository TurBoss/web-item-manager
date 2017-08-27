const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../');

/*  eslint no-unused-vars: 0  */
const should = chai.should();

chai.use(chaiHttp);

describe('userController', () => {
  describe('login controller', () => {
    it('should return 401/message if username wasn\'t found', (done) => {
      chai.request(app)
      .post('/api/user/login')
      .send({ username: 'fakename' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('User: fakename doesn\'t exist');
        done();
      });
    });

    it('should return 401/message if password doesn\'t match', (done) => {
      chai.request(app)
      .post('/api/user/login')
      .send({ username: 'test', password: 'wrongpass' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Incorrect password');
        done();
      });
    });

    it('should return a token if successful', (done) => {
      chai.request(app)
      .post('/api/user/login')
      .send({ username: 'test', password: 'testpass' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.equal(true);
        res.body.should.have.property('token');
        done();
      });
    });
  });
});
