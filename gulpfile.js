var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var karma = require('gulp-karma');
var runSequence =  require('run-sequence');

var paths = {
  inquisitor: 'src/inquisitor.js',
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

gulp.task('inquisitor-dist', function () {
  return gulp.src(paths.inquisitor)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('inquisitor-min-dist', function () {
  return gulp.src(paths.inquisitor)
    .pipe(uglify())
    .pipe(rename({
      basename: 'inquisitor.min'
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', function (callback) {
  runSequence('test', ['inquisitor-dist', 'inquisitor-min-dist'], callback)
});

gulp.task('bundle', require('./tasks/bundle'));

gulp.task('default', ['build']);
