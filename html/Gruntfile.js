module.exports = function(grunt) {

    // Yeoman configuration
    var yeomanConfig = {
        src: 'src',
        dist: 'dist'
    }

    // Grunt configuration
    grunt.initConfig({
        yeoman: yeomanConfig,

        pkg: grunt.file.readJSON('package.json'),

        imageoptim: {
            png: {
                options: {
                    jpegMini: false,
                    imageAlpha: true,
                    quitAfter: true
                },

                src: ['assets/img/**/*.png']
            },

            jpg: {
                options: {
                    jpegMini: true,
                    imageAlpha: false,
                    quitAfter: true
                },

                src: ['assets/img/**/*.{jpg,JPG,jpeg,JPEG}']
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'assets/css/style.css': 'assets/sass/main.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 9', 'ie 8']
            },

            multiple_files: {
                expand: true,
                flatten: true,
                src: 'assets/css/style.css',
                dest: 'assets/css'
            }
        },

        pixrem: {
            dist: {
                src: 'assets/css/style.css',
                dest: 'assets/css/style.css'
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'assets/css',
                src: ['style.css'],
                dest: '../assets',
                ext: '.css'
            }
        },

        // jshint: {
        //     options: {
        //         force: true
        //     },

        //     beforeconcat: ['assets/js/*.js']
        // },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },

            build: {
                files: {
                    'assets/js/main.js': ['assets/js/**/*.js', '!assets/js/*.js', '!assets/js/vendor/selectivizr.js', '!assets/js/vendor/html5shiv.js', 'assets/js/*.js']
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            html: {
                files: ['**/*.php']
            },

            sass: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'pixrem','cssmin']
            },

            scripts: {
                files: ['assets/js/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },

        clean: {
            build: {
                files: [{
                    src: [
                        '.tmp',
                        '*',
                        '!.git*'
                    ]
                }]
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.src %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '**/*.html',
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'assets/js/vendor/selectivizr.js',
                            'assets/js/vendor/html5shiv.js',
                            'assets/img/**/*',
                            'assets/css/fonts/*'
                        ]
                    }
                ]
            }
        }

    });

    // Load grunt tasks matching 'grunt-*'
    require('load-grunt-tasks')(grunt);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', [
        'clean:build',
        'sass', 'autoprefixer', 'pixrem', 'cssmin',
        'uglify',
        'copy:build',
        'imageoptim'
    ]);

};