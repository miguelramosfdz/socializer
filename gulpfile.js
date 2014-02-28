var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cached = require('gulp-cached');
var changed = require('gulp-changed');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var exec = require('child_process').exec;
var lr = require('tiny-lr');
var lrserver = lr();
var nodemon = require('gulp-nodemon');

// var sass = require('gulp-ruby-sass'),
// var autoprefixer = require('gulp-autoprefixer'),
// var minifycss = require('gulp-minify-css'),
// var imagemin = require('gulp-imagemin'),
// var rename = require('gulp-rename'),
// var clean = require('gulp-clean'),

gulp.task('js', function() {
  gulp.src(['app/assets/js/**/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('less', function() {
  gulp.src(['app/assets/less/main.less'])
    .pipe(less())
    // .pipe(concat('main.min.css'))
    .pipe(gulp.dest('public/styles'));
});

/**
 * Watch for file changes
 */
gulp.task('watch', function() {
  /**
   * Watch for less file changes and execute 'less' task
   */
  gulp.watch('app/assets/less/main.less', [ 'less' ]);
});

/**
 * Start Express server & livereload server
 * @return {[type]} [description]
 */
gulp.task('startServer', function() {
  nodemon({
    script: 'config/server.js',
    ignore: ['gulpfile.js']
  })
});

/**
 * Default task for running all necessary tasks
 */
gulp.task('default', ['startServer', 'watch', 'js', 'less', 'less']);

gulp.task('clean', function() {
  gulp.src('build')
    .pipe(clean());
});
