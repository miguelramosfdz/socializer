var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var jsHint = require('gulp-jshint');
var concatinate = require('gulp-concat');
var nodeMonitor = require('gulp-nodemon');
var rename = require('gulp-rename');

var sources = {
  js: './app/assets/scripts/**/*.js',
  styles: {
    main: './app/assets/styles/main.less',
    all: './app/assets/styles/**/*.less',
    build: 'main.css',
    minified: 'main.min.css',
    buildDirectory: 'build/styles'
  },
  backend: [
    './app/controller/**/*.js',
    './app/model/**/*.js',
    './config/**/*.js'
  ],
  build: [
    './build/scripts/*.js',
    './build/styles/*.css',
    './build/views/**/*.html'
  ]
};

// jshint, concat, and minify client side javascript
var clientScripts = function() {
    gulp.src([sources.js])
        .pipe(jsHint())
        .pipe(jsHint.reporter(stylish))
        .pipe(gulp.dest('build/scripts'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'));
};


var serverScripts = function() {
    gulp.src(sources.backend)
        .pipe(jsHint())
        .pipe(jsHint.reporter(stylish))
        .pipe(uglify());
};

// Build CSS from Less files
var stylesTask = function() {
    gulp.src(sources.styles.main)
        .pipe(less())
        .pipe(concatinate(sources.styles.build))
        .pipe(gulp.dest(sources.styles.buildDirectory));
};

// Watch for file changes
var watchTask = function() {
  gulp.src(sources.styles.all).pipe(watch(stylesTask));
  gulp.src(sources.js).pipe(watch(clientScripts));
  gulp.src(sources.backend).pipe(watch(serverScripts));
};

// Start Express server with nodemon
var serverTask = function() {
  nodeMonitor({
    script: 'server/main.js',
    ignore: ['./node_modules', './build'],
    nodeArgs: ['--debug']
  });
};

// Define Tasks
gulp.task('scripts', clientScripts);
gulp.task('lint-backend', serverScripts);
gulp.task('less', stylesTask);
gulp.task('watch', watchTask);
gulp.task('server', serverTask);
gulp.task('build', [ 'less', 'scripts' ]);
gulp.task('default', ['lint-backend', 'watch', 'build', 'server']);
