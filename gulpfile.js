var gulp = require('gulp');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var _ = require('lodash');
var karma = require('gulp-karma');
var runSequence =  require('run-sequence');
var karmaConfig = require('./karma.conf');

var paths = {
  inquirer: 'src/inquirer.js',
  dist: 'dist/'
};

gulp.task('test', function() {
  // A non-existing file is used here since the files are being loaded through the Karma config file
  return gulp.src('./idontexist')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('inquirer-dist', function () {
  return gulp.src(paths.inquirer)
    .pipe(annotate())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('inquirer-min-dist', function () {
  return gulp.src(paths.inquirer)
    .pipe(annotate())
    .pipe(uglify())
    .pipe(rename({
      basename: 'inquirer.min'
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', function (callback) {
  runSequence('test', ['inquirer-dist', 'inquirer-min-dist'], callback)
});

gulp.task('default', ['build']);
