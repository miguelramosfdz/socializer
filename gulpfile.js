var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
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

<<<<<<< HEAD

=======
>>>>>>> 67e612d8fed0ae23ea3d1c1510632e98bab6cfee
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
    .pipe(jshint())
<<<<<<< HEAD
=======
    .pipe(jshint.reporter(stylish))
>>>>>>> 67e612d8fed0ae23ea3d1c1510632e98bab6cfee
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('lint-backend', function() {
  gulp.src(['app/controller','app/model', 'config/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
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
  gulp.watch('app/assets/less/**/*.less', [ 'less' ]);
  gulp.watch('app/assets/js/**/*.js', [ 'js' ]);
  gulp.watch(['app/controller','app/model', 'config/**/*.js'], ['lint-backend']);
});

/**
 * Start Express server & livereload server
 */
gulp.task('startServer', function() {
  nodemon({
    script: 'config/server.js'
  })
});

/**
 * Default task for running all necessary tasks
 */
<<<<<<< HEAD
gulp.task('default', ['startServer', 'watch', 'js', 'less' ]);
=======
gulp.task('default', ['lint-backend', 'startServer', 'watch', 'js', 'less']);
>>>>>>> 67e612d8fed0ae23ea3d1c1510632e98bab6cfee

gulp.task('clean', function() {
  gulp.src('build')
    .pipe(clean());
});
