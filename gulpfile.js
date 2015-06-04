var gulp = require('gulp');

var bundle = require('./tasks/bundle');
var bump = require('./tasks/bump-version');
var git = require('./tasks/git');
var runSequence = require('run-sequence');

gulp.task('bundle:source', function () {
  return bundle(false);
});

gulp.task('bundle:min', function () {
  return bundle(true);
});

gulp.task('bundle', ['bundle:source', 'bundle:min']);

gulp.task('bump-version', bump);

gulp.task('commit-changes', git.commit);
gulp.task('push-changes', git.push);
gulp.task('create-tag', git.tag);

gulp.task('release', function (cb) {
  runSequence(
    'bundle',
    'bump-version',
    'commit-changes',
    //'push-changes',
    'create-tag',
    function (err) {
      if (err) {
        console.log(err.message);
      }
      else {
        console.log('Release finished successfully!');
      }
      cb(err);
    }
  )
});

gulp.task('default', ['bundle']);
