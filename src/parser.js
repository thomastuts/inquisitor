'use strict';

var assign = require('object-assign');

const DEFAULT_OPTIONS = {
  allowAllKeywords: false,
  delimiter: ':'
};

class Parser {
  constructor(options) {
    if (!options.pairs && !options.allowAllKeys) {
      throw new Error('No keys defined, either define pairs or allow all of them with `allowAllKeys`');
    }

    this.options = assign({}, DEFAULT_OPTIONS, options);
    this.regex = new RegExp('\\S+' + this.options.delimiter + '("[^"]+"|\\S+)', 'g');
  }

  /**
   * Retrieves the options for a specific key if there are any.
   *
   * @param key
   * @returns {*}
   */
  getOptionsForKey(key) {
    for (var i = 0; i < this.options.pairs.length; i++) {
      var keywordOptions = this.options.pairs[i];
      if (keywordOptions.key === key) {
        return keywordOptions;
      }
    }
  }

  /**
   * Parses an input string and extracts either the defined key/value pairs from the string, or all of them depending on
   * the parser options on initialisation.
   *
   * @param input
   * @returns {{}}
   */
  parse(input) {
    var keyValuePairs = input.match(this.regex);
    var result = {};

    if (keyValuePairs) {
      for (var i = 0; i < keyValuePairs.length; i++) {
        var expression = keyValuePairs[i].split(this.options.delimiter);
        var key = expression.shift();
        var pairOptions = this.getOptionsForKey(key);
        var value = expression.join(this.options.delimiter).replace(/"/g, '');

        if (value && (pairOptions || this.options.allowAllKeys)) {
          if (pairOptions.multipleValues) {
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
