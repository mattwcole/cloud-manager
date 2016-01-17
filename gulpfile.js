'use strict';

var config = require('./config/config'),
  defaultConfig = require('./config/env/default'),
  _ = require('lodash'),
  gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  tsd = require('gulp-tsd'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  runSequence = require('run-sequence');

// TODO: Angular template cache?

require('./gulpfile-build.js');

var assets = config.assets;
var defaultAssets = defaultConfig.assets;

gulp.task('watch', function() {
  livereload.listen();

  var toWatch = _.flatten([
    assets.server.js,
    assets.server.views,
    assets.client.js,
    assets.client.css,
    assets.client.views
  ]);

  gulp.watch(toWatch).on('change', livereload.changed);
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js hbs',
    watch: _.flatten([assets.server.js, assets.server.views])
  });
});

gulp.task('tsd', function(done) {
  tsd({
    command: 'reinstall',
    config: './tsd.json'
  }, done);
});

gulp.task('eslint', function() {
  var toLint = _.flatten([
    defaultAssets.server.js,
    defaultAssets.client.js,
    'gulpfile.js'
  ]);

  return gulp.src(toLint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// TODO
gulp.task('test', ['eslint']);

gulp.task('dev', function(done) {
  process.env.NODE_ENV = 'development';
  config.reload();
  runSequence('eslint', 'config', ['nodemon', 'watch'], done);
});

gulp.task('prod', function(done) {
  process.env.NODE_ENV = 'production';
  config.reload();
  runSequence('eslint', 'build', ['nodemon', 'watch'], done);
});

gulp.task('default', ['dev']);
