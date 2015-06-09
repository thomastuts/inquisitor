(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Inquisitor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

module.exports = {
  createParser: function createParser(options) {
    return new _parser2['default'](options);
  }
};

},{"./parser":3}],2:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return obj.propertyIsEnumerable(key);
	});
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var assign = require('object-assign');

var DEFAULT_OPTIONS = {
  allowAllKeywords: false,
  delimiter: ':'
};

var Parser = (function () {
  function Parser(options) {
    _classCallCheck(this, Parser);

    if (!options.pairs && !options.allowAllKeys) {
      throw new Error('No keys defined, either define pairs or allow all of them with `allowAllKeys`');
    }

    this.options = assign({}, DEFAULT_OPTIONS, options);
    this.regex = new RegExp('\\S+' + this.options.delimiter + '("[^"]+"|\\S+)', 'g');
  }

  _createClass(Parser, [{
    key: 'getOptionsForKey',

    /**
     * Retrieves the options for a specific key if there are any.
     *
     * @param key
     * @returns {*}
     */
    value: function getOptionsForKey(key) {
      for (var i = 0; i < this.options.pairs.length; i++) {
        var keywordOptions = this.options.pairs[i];
        if (keywordOptions.key === key) {
          return keywordOptions;
        }
      }
    }
  }, {
    key: 'parse',

    /**
     * Parses an input string and extracts either the defined key/value pairs from the string, or all of them depending on
     * the parser options on initialisation.
     *
     * @param input
     * @returns {{}}
     */
    value: function parse(input) {
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
            } else {
              result[key] = value;
            }
          }
        }
      }

      return result;
    }
  }]);

  return Parser;
})();

module.exports = Parser;

},{"object-assign":2}]},{},[1])(1)
});