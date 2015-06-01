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
