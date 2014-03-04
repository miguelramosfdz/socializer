var gulp = require('gulp');
var jade = require("gulp-jade");
var less = require('gulp-less');
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
  js: 'app/assets/js/**/*.js',
  less: {
    main: 'app/assets/less/main.less',
    all: 'app/assets/less/**/*.less'
  },
  jade: './app/views/**/*.jade',
  backend: [ 'app/controller', 'app/model', 'config/**/*.js' ],
  build: ['build/scripts/*.js', 'build/styles/*.css', 'build/views/**/*.html']
};

// Modules required for LiveReload
var lr = require('tiny-lr')();
var livereload = require('gulp-livereload');

// TODO Implement these gulp helpers
// var autoprefixer = require('gulp-autoprefixer'),
// var minifycss = require('gulp-minify-css'),
// var imagemin = require('gulp-imagemin'),
// var clean = require('gulp-clean'),

// Concat
gulp.task('scripts', function() {
    gulp.src([sources.js])
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(concat('all.js'))
      .pipe(gulp.dest('build/scripts'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/scripts'));
});

// Compile Jade file to HTML
gulp.task('jade', function() {
  gulp.src([sources.jade])
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest("./build/views"))
});

// Lint server-side files
gulp.task('lint-backend', function() {
  gulp.src(sources.backend)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(uglify())
});

// Build CSS from Less files
gulp.task('less', function() {
  gulp.src([sources.less.main])
    .pipe(less())
    .pipe(gulp.dest('build/styles'));
});

// Notify LiveReload
function restartBrowser(event) {
  gulp.src(event.path, {read: false})
    .pipe(require('gulp-livereload')(lr));
};

gulp.task('livereload', restartBrowser);

// Watch for file changes
gulp.task('watch', function() {
  gulp.watch(sources.less.all, [ 'less' ]);
  gulp.watch(sources.js, [ 'scripts' ]);
  gulp.watch(sources.backend, ['lint-backend']);
  gulp.watch(sources.build, restartBrowser);
});

// Start Express server with nodemon
gulp.task('startServer', function() {
  nodemon({
    script: 'config/server.js'
  });
});

// Default task for running all necessary tasks
gulp.task('default', ['lint-backend', 'watch', 'scripts', 'less', 'jade', 'startServer']);

// gulp.task('clean', function() {
//   gulp.src('build')
//     .pipe(clean());
// });
