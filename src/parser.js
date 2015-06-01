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
    var result = {};

    if (expressions) {
      for (var i = 0; i < expressions.length; i++) {
        var expression = expressions[i].split(':');
        var keyword = expression.shift();
        var value = expression.join(':').replace(/"/g, '');

        result[keyword] = value;
      }
    }

    return result;
  }
}

module.exports = Parser;
