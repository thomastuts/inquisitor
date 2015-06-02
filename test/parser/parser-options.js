'use strict';

var Inquisitor = require('../../src/index');

describe('Parser options', function () {
  describe('customDelimiter', function () {
    beforeEach(function () {
      this.parser = Inquisitor.createParser({
        delimiter: '=',
        pairs: [
          {
            key: 'foo'
          }
        ]
      });
    });

    it('should be able to use custom delimiters instead of the default one', function () {
      var input = 'foo=bar';
      var output = this.parser.parse(input);

      output.should.deep.equal({
        foo: 'bar'
      });
    });
  });
});
