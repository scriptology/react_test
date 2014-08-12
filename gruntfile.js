// Обязательная обёртка
module.exports = function(grunt) {

    // Задачи
    grunt.initConfig({

        // проверка кода javascript с помощью утилиты jshint

//        jshint: {
//            options: {
//                jshintrc: '.jshintrc'
//            },
//            all: [
//                'static/work/js/*.js'
//              ]
//        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.

        // Склеиваем
//        concat: {
//            main: {
//                src: [
//                    'static/work/lib/angular.js',
//                    'static/work/js/**/*.js',
//                    'static/work/js/**/***.js'
//                ],
//                dest: 'static/work/tmp/scripts.js'
//            }
//        },

        react: {
          //single_file_output: {
          //  files: {
          //    'static/work/temp/comment.js': 'static/work/jsx/comment.jsx'
          //  }
          //}
          combined_file_output: {
            files: {
              'static/work/temp/comment.js': [
                '/Users/ASolovyev@dir.condenast.ru/Documents/storm/react_test/static/work/jsx/comment.jsx' 
              ]
            }
          }
          //dynamic_mappings: {
          //  files: [
          //    {
          //      expand: true,
          //      cwd: 'path/to/jsx/templates/dir',
          //      src: ['**/*.jsx'],
          //      dest: 'path/to/output/dir',
          //      ext: '.js'
          //    }
          //  ]
          //}
        },

        browserify: {
            options: {
                transform:
                    [ require('grunt-react').browserify ]
            },
            app: {
                src: [
                    'static/work/lib/react.js',
                    'static/work/js/**/*.js',
                    'static/work/js/**/***.js'
                ],
                dest: 'static/work/tmp/scripts.js'
            }
        },

//        ngmin: {
//            dist: {
//                files: [{
//                    expand: true,
//                    cwd: 'static/work/tmp/',
//                    src: '*.js',
//                    dest: 'static/public/js/'
//                }]
//            }
//        },


//        // Сжимаем
//        uglify: {
//            options: {
//                mangle: false
//            },
//            main: {
//                files: {
//                    // Результат задачи concat
//                    'static/public/js/scripts.min.js': '<%= browserify.app.dest %>'
//                }
//            }
//        },

        compass: {
            dist: {
                options: {
                    sassDir: 'static/work/sass',
                    cssDir: 'static/work/css'
                }
            }
        },

        // Склеиваем css
        concat_css: {
            options: {
              // Task-specific options go here.
            },
            all: {
              src: [
                  "static/work/css/template.css",
                  "static/work/css/*.css"
              ],
              dest: "static/public/css/template.css"
            }
          },


//        cssmin: {
//          minify: {
//            expand: true,
//            cwd: 'stylesheet/css/',
//            src: ['*.css', '!*.min.css'],
//            dest: 'build/css/',
//            ext: '.min.css'
//          }
//        },
        /*
        includereplace: {
          your_target: {
            options: {
              // Task-specific options go here.
            },
            // Files to perform replacements and includes with
            src: '*.html',
            // Destination directory to copy files to
            dest: 'template/'
          }
        },
        */

        watch: {
//            scripts: {
//                files: [
//                    'static/work/js/*.js',
//                    'static/work/js/**/*.js'
//                ],
//                tasks: ['jshint', 'concat', 'uglify'],
//                options: {
//                    spawn: false
//                }
//            },
            sass: {
                files: ['static/work/sass/*.sass'],
                tasks: ['compass'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['static/work/css/*.css'],
                tasks: ['concat_css'],
                options: {
                    spawn: false
                }
            }
//            html: {
//                files: [
//                    '*.html',
//                    'include_html/**/*.html',
//                    'include_html/*.html'
//                ],
//                tasks: ['includereplace'],
//                options: {
//                    spawn: false
//                }
//            }
//            ,
//            css: {
//                files: ['stylesheet/css/*.css'],
//                tasks: ['cssmin'],
//                options: {
//                    spawn: false
//                }
//            }
        }

    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-include-replace');
    //grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-react');
    //grunt.loadNpmTasks('browserify');

    // Задача по умолчанию
    grunt.registerTask('default', ['compass', 'react', 'concat_css', 'watch']);
};