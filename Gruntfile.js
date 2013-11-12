'use strict';
var path = require('path');
var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      options: {
        port: 3000,
        hostname: '*',
        bases: path.resolve('public'),
        monitor: {},
        debug: true,
        server: path.resolve('./config/server')
      },
      dev : {
        port: 3000
      }
    },

    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      styles: {
        files: [
          'app/assets/styles/*.scss',
          'app/assets/styles/**/*.scss'
        ],
        tasks: [ 'sass' ]
      },
      config: {
        files: [
          'config/*.js',
          'config/envs/*.js'
        ]
      },
      js: {
        files: [
          "*.js",
          'app/**/*.js',
          'app/models/*.js'
        ]
      },
      scripts: {
        files: [
          'public/scripts/**/*.js'
        ],
      },
      jade: {
        files: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ]
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/assets/styles',
          src: ['*.scss'],
          dest: 'public/styles',
          ext: '.css'
        }]
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }

  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', [ 'express', 'watch' ]);
  grunt.registerTask('test', [ 'mochaTest' ]);

};