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
});
