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

  it('should return success false for invalid tokens', function(done) {
    const res = isValidToken('invalid token');
    res.success.should.equal(false);
    done();
  });

  it('should return success true for valid tokens', function(done) {
    const res = isValidToken(validToken);
    res.success.should.equal(true);
    done();
  });
});
