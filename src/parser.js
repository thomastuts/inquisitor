'use strict';

const KEY_VALUE_PAIR_REGEX = /\S+:("[^"]+"|\S+)/g;

class Parser {
  constructor(options) {

    if (!options.pairs && !options.allowAllKeys) {
      throw new Error('No keys defined, either define pairs or allow all of them with `allowAllKeys`');
    }

    this.options = options;
  }

  getOptionsForKey(key) {
    for (var i = 0; i < this.options.pairs.length; i++) {
      var keywordOptions = this.options.pairs[i];
      if (keywordOptions.key === key) {
        return keywordOptions;
      }
    }
  }

  parse(input) {
    var keyValuePairs = input.match(KEY_VALUE_PAIR_REGEX);
    var result = {};

    if (keyValuePairs) {
      for (var i = 0; i < keyValuePairs.length; i++) {
        var expression = keyValuePairs[i].split(':');
        var key = expression.shift();
        var pairOptions = this.getOptionsForKey(key);
        var value = expression.join(':').replace(/"/g, '');

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
