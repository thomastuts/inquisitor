var gulp = require('gulp');

gulp.task('bundle', require('./tasks/bundle'));
gulp.task('default', ['build']);
