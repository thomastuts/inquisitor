'use strict';

import Parser from './parser';

module.exports = {
  createParser(options) {
    return new Parser(options);
  }
};
