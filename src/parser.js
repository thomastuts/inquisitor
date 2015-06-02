'use strict';

class Parser {
  constructor(options) {

    if (!options.keywords && !options.allowAllKeywords) {
      throw new Error('No keywords defined, either define keywords or allow all of them with `allowAllKeywords`');
    }

    this.options = options;
  }

  parse(input) {
    var keyValuePairs = input.split(' ');
    var result = {};

    if (keyValuePairs) {
      for (var i = 0; i < keyValuePairs.length; i++) {
        var expression = keyValuePairs[i].split(':');
        var key = expression.shift();
        var value = expression.join(':').replace(/"/g, '');

        if (value) {
          result[key] = value;
        }
      }
    }

    return result;
  }
}

module.exports = Parser;
