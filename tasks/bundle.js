'use strict';

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');

var b = browserify({
  entries: ['./src/index.js'],
  debug: true,
  standalone: 'Inquisitor'
});

b.transform(babelify);
b.on('log', gutil.log); // output build logs to terminal

module.exports = function (minified) {
  var filename = minified ? 'bundle.min.js' : 'bundle.js';

  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(filename))
    .pipe(buffer())
    .pipe(gulpIf(minified, uglify()))
    .pipe(gulp.dest('./dist'));
};
