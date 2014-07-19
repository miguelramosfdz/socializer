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

    nodemon: {
      dev: {
        options: {
          file: 'config/server.js',
          args: ['dev'],
          nodeArgs: ['--debug'],
          ignoredFiles: ['node_modules/**', 'public/components'],
          watchedExtensions: ['js'],
          watchedFolders: [ '.' ],
          delayTime: 1,
          legacyWatch: true,
          env: {
            PORT: '5000'
          },
          cwd: __dirname
        }
      },
      exec: {
        options: {
          exec: 'less'
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'node-inspector', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    'node-inspector': {
      custom: {
        options: {
          'web-port': 4000,
          'web-host': 'localhost',
          'debug-port': 3000,
          'save-live-edit': true
        }
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
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-node-inspector');

  grunt.registerTask('default', [ 'concurrent' ]);
  grunt.registerTask('test', [ 'mochaTest' ]);

};