var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('server:watch', function () {
  gulp.watch('app/**/*.js', [ 'server:restart' ]);
});

gulp.task('server:restart', shell.task([ 'nodemon ./server.js' ]));