var gulp = require('gulp');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var karma = require('karma').server;

var karmaConfig = require('./karma.conf.js');

var paths = {
  inquirer: 'src/inquirer.js',
  dist: 'dist/'
};

gulp.task('test', function (done) {
  karma.start(_.assign({}, karmaConfig, {singleRun: true}), done);
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

gulp.task('build', ['inquirer-dist', 'inquirer-min-dist']);

gulp.task('default', ['build']);
