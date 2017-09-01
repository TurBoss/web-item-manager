const chai = require('chai');
const boolConvert = require('../utils/boolConvert');

const should = chai.should();

describe('boolConvert()', function() {
  it('should return "1" if parameter is true', function(done) {
    const res = boolConvert(true);
    res.should.equal('1');
    done();
  });

  it('should return "0" if parameter is false', function(done) {
    const res = boolConvert(false);
    res.should.equal('0');
    done();
  });

  it('should return false if no parameter', function(done) {
    const res = boolConvert();
    res.should.equal(false);
    done();
  });
});
