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
