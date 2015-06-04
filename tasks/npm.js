'use strict';

var spawn = require('child_process').spawn;

module.exports = {
  publish: function (done) {
    spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
  }
};
