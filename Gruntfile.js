module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        src: 'src/**/*.less',
        dest: 'dist/main.css',
        options: {
          sourceMap: true
        }
      },
      production: {
        src: 'src/**/*.less',
        dest: 'dist/main.css',
        options: {
          yuicompress: true
        }
      }
    },
    develop: {
      server: {
        file: 'app.js'
      }
    },
    font_optimizer: {
      default: {
        options: {},
        files: {
          'dist': ['src/Sharik/fonts/*.ttf'],
        }
      }
    },
    watch: {
      less: {
        files: ['src/**/*.less'],
        tasks: ['less:development'],
        options: {
          nospawn: true
        }
      },
      node: {
        files: [
          'app.js',
          'routes/**/*.js',
          'lib/*.js',
        ],
        tasks: ['jshint', 'develop'],
        options: {
          nospawn: true
        }
      },
      requirejs: {
        files: [
          'src/**/*.js'
        ],
        tasks: ['jshint', 'copy'],
        options: {
          nospawn: true
        }
      },
      nunjucks: {
        files: ['src/**/*.html'],
        tasks: ['nunjucks:precompile']
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: './src',
        src: '**/*.js',
        dest: 'dist'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'app.js',
        'routes/**/*.js',
        'src/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    nunjucks: {
      precompile: {
        src: 'src/**/*.html',
        dest: 'dist/templates.js'
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: './bower_components',
          mainConfigFile: './src/main.js',
          include: ['main'],
          paths: {
            'templates': '../dist/templates',
            'languages': '../src/languages'
          },
          out: './dist/main.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nunjucks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-font-optimizer');

  grunt.registerTask('default', [
    'less:development',
    'nunjucks',
    'copy',
    'develop',
    'watch'
  ]);

  grunt.registerTask('fonts', [
    'font_optimizer:default'
  ]);

  grunt.registerTask('heroku', [
    'jshint',
    'nunjucks',
    'less:production',
    'requirejs',
  ]);

};
