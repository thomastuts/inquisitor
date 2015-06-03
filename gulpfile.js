var gulp = require('gulp');

var bundle = require('./tasks/bundle');

gulp.task('bundle:source', function () {
  return bundle(false);
});

gulp.task('bundle:min', function () {
  return bundle(true);
});

gulp.task('bundle', ['bundle:source', 'bundle:min']);

gulp.task('default', ['build']);
