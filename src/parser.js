'use strict';

const KEYWORD_REGEX = /([A-Za-z\d_-]+):((".*?")|([A-Za-z\d_\-/:]+))/gi;

class Parser {
  constructor(options) {
    this.options = options;
  }

  parse(input) {
    var expressions = input.match(KEYWORD_REGEX);
    return expressions;
  }
}

module.exports = Parser;
