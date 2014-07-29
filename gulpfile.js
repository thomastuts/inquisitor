var gulp = require('gulp');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  inquirer: 'src/inquirer.js',
  dist: 'dist/'
};

gulp.task('inquirer-dist', function () {
  gulp.src(paths.inquirer)
    .pipe(annotate())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('inquirer-min-dist', function () {
  gulp.src(paths.inquirer)
    .pipe(annotate())
    .pipe(uglify())
    .pipe(rename({
      basename: 'inquirer.min'
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['inquirer-dist', 'inquirer-min-dist']);

gulp.task('default', ['build']);
