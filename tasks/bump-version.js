'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');
var gutil = require('gulp-util');

module.exports = function (change) {
  change = change || 'patch';

  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({
      type: change
    })
    .on('error', gutil.log))
    .pipe(gulp.dest('./'));
};
