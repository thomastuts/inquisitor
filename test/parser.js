'use strict';

var Inquisitor = require('../src/index');

describe('Initialization', function () {
  it('should throw an error if no keywords are given and not all keywords are allowed', function () {
    (function () {
      Inquisitor.createParser({
        allowAllKeywords: false
      });
    }).should.throw();
  });
});

describe('Basic parsing', function () {
  beforeEach(function () {
    this.parser = Inquisitor.createParser({
      keywords: [
        {
          keyword: 'foo'
        },
        {
          keyword: 'bar'
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
    var input = 'foo:/banana';
    var output = this.parser.parse(input);

    output.should.deep.equal({
      foo: '/banana'
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

describe('Keyword-specific options', function () {
  describe('multiple', function () {
    beforeEach(function () {
      this.parser = Inquisitor.createParser({
        keywords: [
          {
            keyword: 'foo',
            multiple: true
          }
        ]
      });
    });

    it('should add multiple values to a key if the option is set to true', function () {
      var input = 'foo:one bar:baz foo:two';
      var output = this.parser.parse(input);

      output.should.deep.equal({
        foo: ['one', 'two']
      });
    });
  });
});
