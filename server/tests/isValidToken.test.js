const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../');
const db = require('../utils/database');
const isValidToken = require('../utils/isValidToken');

/*  eslint no-unused-vars: 0  */
const should = chai.should();

chai.use(chaiHttp);

describe('isValidToken()', function() {
  let validToken = 'Bearer ';

  before(function(done) {
    db.init();
    db.insertUser({ name: 'test', password: '123', admin: true, test: false });

    chai.request(app)
    .post('/api/user/login')
    .send({ username: 'test', password: '123' })
    .end((err, res) => {
      validToken += res.body.token;
      done();
    });
  });

  it('should require a parameter', function(done) {
    const res = isValidToken();
    res.should.equal(false);
    done();
  });

  it('should require a valid token', function(done) {
    let res = isValidToken('invalid token');
    res.success.should.equal(false);
    res = isValidToken(validToken);
    res.success.should.equal(true);
    done();
  });

  after(function(done) {
    db.drop();
    db.close();
    done();
  });
});
