var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    rewire = require('rewire'),
    beaufort = rewire('../beaufort'),
    kmhLimits = beaufort.__get__("kmhLimits");

describe('#beaufort', function() {
  it('handles null input', function() {
    expect(beaufort()).to.be.undefined;
    expect(beaufort(undefined)).to.be.undefined;
  });

  it('returns undefined for windspeed < 0', function() {
    expect(beaufort(-1)).to.be.undefined;
  });
  
});

describe('#beaufort with params', function() {
  it('returns values with valid units', function() {
    // normal input, should be defined
    beaufort(42, {unit:'kmh'}).should.not.be.undefined;

    // normal input, should be defined
    beaufort(42, {getName: true}).should.not.be.undefined;
  });

  it('returns values with invalid units', function() {
    // invalid input, defaults unit to unit default.
    beaufort(42, {unit: 3}).should.not.be.undefined; 

    // invalid input, defaults to getName default.
    beaufort(42, {getName: 3}).should.not.be.undefined;

    expect(beaufort('this')).to.be.undefined;
  });

  it('returns undefined for non-defined units', function() {
    // invalid units default to undefined (if they are string)
    expect(beaufort(42, {unit: 'fish'})).to.be.undefined;
  });

});

describe('#kmhLimit', function() {
  it('gives correct values for each beaufort number', function() {
    // test each kmhLimit
    kmhLimits.forEach(function(elem, index, array) {
      beaufort(elem, {getName: false}).should.equal(index);
    });
  });
  
});
