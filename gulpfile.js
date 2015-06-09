var gulp = require('gulp');

var bundle = require('./tasks/bundle');
var bump = require('./tasks/bump-version');
var git = require('./tasks/git');
var npm = require('./tasks/npm');
var runSequence = require('run-sequence');
var argv = require('minimist')(process.argv.slice(2));

gulp.task('bundle:source', function () {
  return bundle(false);
});

gulp.task('bundle:min', function () {
  return bundle(true);
});

gulp.task('bump-version', function () {
  return bump(argv.change);
});

gulp.task('commit-changes', git.commit);
gulp.task('push-changes', git.push);
gulp.task('create-tag', git.tag);

gulp.task('npm-publish', npm.publish);

gulp.task('release', function (cb) {
  runSequence(
    'bundle:source',
    'bundle:min',
    'bump-version',
    'commit-changes',
    'push-changes',
    'create-tag',
    'npm-publish',
    function (err) {
      if (err) {
        console.log(err.message);
      }
      else {
        console.log('Release finished successfully!');
      }
      cb(err);
    }
  );
});

gulp.task('default', ['bundle']);
