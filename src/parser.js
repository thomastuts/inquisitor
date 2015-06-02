'use strict';

class Parser {
  constructor(options) {

    if (!options.keywords && !options.allowAllKeywords) {
      throw new Error('No keywords defined, either define keywords or allow all of them with `allowAllKeywords`');
    }

    this.options = options;
  }

  getOptionsForKey(keyword) {
    for (var i = 0; i < this.options.keywords.length; i++) {
      var keywordOptions = this.options.keywords[i];
      if (keywordOptions.keyword === keyword) {
        return keywordOptions;
      }
    }
  }

  parse(input) {
    var keyValuePairs = input.split(' ');
    var result = {};

    if (keyValuePairs) {
      for (var i = 0; i < keyValuePairs.length; i++) {
        var expression = keyValuePairs[i].split(':');
        var key = expression.shift();
        var keywordOptions = this.getOptionsForKey(key);
        var value = expression.join(':').replace(/"/g, '');

        if (value && (keywordOptions || this.options.allowAllKeywords)) {
          if (keywordOptions.multiple) {
            if (!result[key]) {
              result[key] = [];
            }
            result[key].push(value);
          }
          else {
            result[key] = value;
          }
        }
      }
    }

    return result;
  }
}

module.exports = Parser;
