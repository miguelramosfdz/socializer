var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var cached = require('gulp-cached');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');

/**
 * Modules required for LiveReload
 */
var lr = require('tiny-lr');
var lrserver = lr();
var livereload = require('gulp-livereload');

/**
 * Have commented out gulp-jshint due to issue with downloading it from
 * NPM
 */
// var jshint = require('gulp-jshint');

/**
 * TODO Implement these gulp helpers
 */
// var autoprefixer = require('gulp-autoprefixer'),
// var minifycss = require('gulp-minify-css'),
// var imagemin = require('gulp-imagemin'),
// var rename = require('gulp-rename'),
// var clean = require('gulp-clean'),

/**
 *
 */
gulp.task('js', function() {
  gulp.src(['app/assets/js/**/*.js'])
    // .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('less', function() {
  gulp.src(['app/assets/less/main.less'])
    .pipe(less())
    .pipe(gulp.dest('build/styles'));
});

/**
 * Watch for file changes
 */
gulp.task('watch', function() {
  /**
   * Watch for less file changes and execute 'less' task
   */
  gulp.watch('app/assets/less/main.less', [ 'less' ]);
  gulp.watch('app/assets/js/**/*.js', [ 'js' ]);
});

/**
 * Start Express server & livereload server
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
