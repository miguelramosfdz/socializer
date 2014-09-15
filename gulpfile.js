var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var jsHint = require('gulp-jshint');
var concatinate = require('gulp-concat');
var nodeMonitor = require('gulp-nodemon');
var rename = require('gulp-rename');
var browserify = require('browserify');
var del = require('del');
var source = require('vinyl-source-stream');

var sources = {
  js: {
    dir: './app/assets/scripts/**/*.js',
    main: './app/assets/scripts/main.js'
  },
  styles: {
    main: './app/assets/styles/main.less',
    all: './app/assets/styles/**/*.less',
    build: 'main.css',
    minified: 'main.min.css',
    buildDirectory: 'public/styles'
  },
  backend: [
    './app/controller/**/*.js',
    './app/model/**/*.js',
    './config/**/*.js'
  ],
  build: [
    './public/scripts/*.js',
    './public/styles/*.css',
    './public/views/**/*.html'
  ]
};

gulp.task('clean-scripts', function(done) {
  del(['./public/scripts'], done);
});

gulp.task('clean-styles', function(done) {
  del(['./public/styles'], done);
});

gulp.task("jshint", function() {
  gulp.src(sources.js.dir)
      .pipe(jsHint())
      .pipe(jsHint.reporter(stylish));
});

var browserifyClient = function() {
  browserify(sources.js.main)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/scripts'));
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
  gulp.src(sources.styles.all).pipe(watch({
    glob: sources.styles.all
  }, function() {
    gulp.start('less');
  }));

  gulp.src(sources.js.dir).pipe(watch({
    glob: 'app/assets/scripts/**/*.js'
  }, function() {
    gulp.start('scripts');
  }));

  gulp.src(sources.backend).pipe(watch({
    glob: sources.backend 
  }, function() {
    gulp.start('lint-backend');
  }));

};

// Start Express server with nodemon
var serverTask = function() {
  nodeMonitor({
    script: 'server/main.js',
    ignore: [
      './.git/',
      './node_modules', 
      './public/',
      './app/assets'
    ],
    nodeArgs: ['--debug']
  });
};

// Define Tasks
gulp.task('watch', watchTask);
gulp.task('server', serverTask);
gulp.task('lint-backend', serverScripts);
gulp.task('build', [ 'less', 'scripts' ]);
gulp.task('less', ['clean-styles'], stylesTask);
gulp.task('scripts', ['clean-scripts'], browserifyClient);
gulp.task('default', ['lint-backend', 'watch', 'build' ]);
