'use strict';

var Inquisitor = require('../../src/index');

describe('Basic parsing', function () {
  beforeEach(function () {
    this.parser = Inquisitor.createParser({
      pairs: [
        {
          key: 'foo'
        },
        {
          key: 'bar'
        }
      ]
    });
  });

  it('should get defined keywords', function () {
    var input = 'foo:5 bar:banana';
    var output = this.parser.parse(input);

    output.should.deep.equal({
      foo: '5',
      bar: 'banana'
    });
  });

  it('should handle colons in an expression value', function () {
    var input = 'foo:one:two';
    var output = this.parser.parse(input);

    output.should.deep.equal({
      foo: 'one:two'
    });
  });

  it('should handle non-alphabetical characters correctly', function () {
    var input = 'foo:/banana bar:5';
    var output = this.parser.parse(input);

    output.should.deep.equal({
      foo: '/banana',
      bar: '5'
    });
  });

  it('should exclude keywords with no values', function () {
    var input = 'foo: bar:banana';
    var output = this.parser.parse(input);

    output.should.deep.equal({
      bar: 'banana'
    });
  });

  it('should include a quoted string in its entirety', function () {
    var input = 'foo:"quoted string"';
    var output = this.parser.parse(input);

    output.should.deep.equal({
      foo: 'quoted string'
    });
  });
});
