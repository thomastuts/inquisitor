'use strict';

var Inquisitor = require('../../src/index');

describe('Options', function () {
  describe('multipleValues', function () {
    beforeEach(function () {
      this.parser = Inquisitor.createParser({
        pairs: [
          {
            key: 'foo',
            multipleValues: true
          },
          {
            key: 'bar'
          }
        ]
      });
    });

    it('should add multiple values to a key if the option is set to true', function () {
      var input = 'foo:one bar:baz foo:two';
      var output = this.parser.parse(input);

      output.should.deep.equal({
        foo: ['one', 'two'],
        bar: 'baz'
      });
    });

    it('should take the last value from a key/value pair if the pair is not using multiple values', function () {
      var input = 'foo:one bar:baz bar:banana foo:two';
      var output = this.parser.parse(input);

      output.should.deep.equal({
        foo: ['one', 'two'],
        bar: 'banana'
      });
    });
  });
});
