var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

var paths = {
  backend: [ 'config/**/*.js', 'app/controllers/**/*.js'],
  scripts: {
    src: './app/assets/scripts/**/*.js',
    build: './public/scripts'
  },
  styles: {
    src: './app/assets/styles/main.scss',
    srcFiles: './app/assets/styles/**/*.scss',
    build: './public/styles'
  }
};

gulp.task('server', function () {
  nodemon({ 
    script: 'config/server.js',
    ext: 'js html', 
    env: { NODE_ENV: 'development' },
    ignore: ['./app/assets/**','./app/views/**','./public/**'],
    nodeArgs: ['--debug'] 
  }).on('restart', function () {
    console.log('restarted!');
  });
});

var stylesBuild = function() {
  return gulp.src(paths.styles.src)
              .pipe(sass())
              .pipe(gulp.dest(paths.styles.build));
};

var scriptsBuild = function() {
  return gulp.src(paths.scripts.src)
              .pipe(jshint())
              .pipe(gulp.dest(paths.scripts.build));
};

var serverLint = function() {
  return gulp.src(paths.backend).pipe(jshint());
};

gulp.task('watch', function() {
  watch(paths.scripts.src, scriptsBuild);
  watch(paths.styles.srcFiles, stylesBuild);
});

gulp.task('styles-build', stylesBuild);
gulp.task('scripts-build', scriptsBuild);
gulp.task('backend-lint', serverLint);
gulp.task('build', ['styles-build', 'scripts-build']);

gulp.task('default', ['build', 'watch', 'server']);