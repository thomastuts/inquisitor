'use strict';

var gulp = require('gulp');
var git = require('gulp-git');
var fs = require('fs');

var DEFAULT_COMMIT_MESSAGE = '[Prerelease] Create build';

function getPackageJsonVersion () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
}

module.exports = {
  commit: function () {
    var message = DEFAULT_COMMIT_MESSAGE + ' for ' + getPackageJsonVersion();
    return gulp.src('.')
      .pipe(git.commit(message, {args: '-a'}));
  },
  push: function (cb) {
    git.push('origin', 'master', cb);
  },
  tag: function (cb) {
    var version = getPackageJsonVersion();
    git.tag(version, 'Created tag for version: ' + version, function (error) {
      if (error) {
        return cb(error);
      }
      git.push('origin', 'master', {args: '--tags'}, cb);
    });
  }
};
