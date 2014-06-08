var gulp = require('gulp');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var cached = require('gulp-cached');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');

var sources = {
    js: './client/scripts/**/*.js',
    less: {
        main: './client/styles/main.less',
        all: './client/styles/**/*.less'
    },
    jade: './app/views/**/*.jade',
    backend: [ './app/controller', './app/model', './config/**/*.js' ],
    build: ['./build/scripts/*.js', './build/styles/*.css', './build/views/**/*.html']
};

// jshint, concat, and minify client side javascript
var clientScripts = function() {
    gulp.src([sources.js])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('boiler.js'))
        .pipe(gulp.dest('build/scripts'))
        .pipe(rename('boiler.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'));
};

// jshing server side javascript
var serverHint = function() {
    gulp.src(sources.backend)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
};

// Build CSS from Less files
var lessBuild = function() {
    gulp.src([sources.less.main])
        .pipe(less())
        .pipe(concat('boiler.css'))
        .pipe(gulp.dest('build/styles'))
        .pipe(minifycss())
        .pipe(rename('boiler.min.css'))
        .pipe(gulp.dest('build/styles'));
};

// Watch for file changes
var watchFiles = function() {
    gulp.watch(sources.less.all, [ 'less' ]);
    gulp.watch(sources.js, [ 'scripts' ]);
    gulp.watch(sources.backend, ['lint-backend']);
};

// Start Express server with nodemon
var serverTask = function() {
    nodemon({
        script: 'server/main.js'
    });
};

// Define Tasks
gulp.task('scripts', clientScripts);
gulp.task('lint-backend', serverHint);
gulp.task('less', lessBuild);
gulp.task('watch', watchFiles);
gulp.task('server', serverTask);
gulp.task('build', [ 'less', 'scripts' ]);
gulp.task('default', ['lint-backend', 'watch', 'build', 'server']);
