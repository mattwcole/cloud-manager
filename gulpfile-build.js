'use strict';

var config = require('./config/config'),
  defaultConfig = require('./config/env/default'),
  gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  cssnano = require('gulp-cssnano'),
  ngConstant = require('gulp-ng-constant'),
  rename = require('gulp-rename'),
  runSequence = require('run-sequence');

var defaultAssets = defaultConfig.assets;

gulp.task('uglify', function() {
  return gulp.src(defaultAssets.client.js)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('cssnano', function () {
  return gulp.src(defaultAssets.client.css)
    .pipe(cssnano())
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('config', function() {
  return ngConstant({
    constants: {config: config.client},
    stream: true,
    space: 2,
    name: 'cm-config',
    templatePath: 'cm-config.tpl.ejs'
  })
  .pipe(rename('cm-config.js'))
  .pipe(gulp.dest('public/dist'));
});

gulp.task('build', function (done) {
  runSequence('config', ['uglify', 'cssnano'], done);
});

gulp.task('default', ['build']);
