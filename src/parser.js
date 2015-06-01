'use strict';

const KEYWORD_REGEX = /([A-Za-z\d_-]+):((".*?")|([A-Za-z\d_\-/:]+))/gi;

class Parser {
  constructor(options) {

    if (!options.keywords && !options.allowAllKeywords) {
      throw new Error('No keywords defined, either define keywords or allow all of them with `allowAllKeywords`');
    }

    this.options = options;
  }

  parse(input) {
    var expressions = input.match(KEYWORD_REGEX);
    return expressions;
  }
}

module.exports = Parser;
