'use strict';
module.exports = function(grunt) {

	//Load grunt tasks automatically

	require('load-grunt-tasks')(grunt);

// Project configuration.

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Autoprefixer
		autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            server: {
                options: {
                    map: true,
                },
                files: [{
                    expand: true,
                    cwd: 'src/styles/',
                    src: '{,*/}*.css',
                    dest: 'src/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: '{,*/}*.css',
                    dest: 'dist/css/'
                }]
            }
        },

        // Bower copy

        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },
            scripts: {
                options: {
                    destPrefix: 'src/js'
                },
                files: {
                    '/jquery.js': 'jquery/dist/jquery.min.js',
                    '/owl.carousel.js': 'owl.carousel/dist/owl.carousel.js',
                }
            } //,
            
            // styles: {
            //     options: {
            //         destPrefix: 'src/css/less'
            //     },
            //     files: {
            //         '/owl-carousel.less': 'owl-carousel/owl-carousel/owl.carousel.css'
            //     }
            // }
            
        },

        //Modernizr build

        modernizr: {
		 
		    dist: {
		 
		        // Path to save out the built file 
		        "dest" : "src/js/modernizr-custom.js",
		        // More settings go here 
		    }
		 
		},

		// copy src to dist
		copy: {
            indexcopy: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*.html'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            },
            jscopy: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['*.js'],
                    dest: 'dist/js',
                    filter: 'isFile'
                }]
            }
        },

        // Connect Server
        connect: {
            server: {
                options: {
                    hostname: '*',
                    livereload: true,
                    open: {
                        target: 'http://localhost:8000'
                    },
                    port: 8000,
                    base: 'dist',
                    useAvailablePort: true
                }
            }
        },

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': 'src/css/style.css'
                }
            }
        },

        less: {
            build: {
                files: {
                    'src/css/style.css': 'src/css/less/style.less'
                }
            }
        },

        imagemin: {
            dynamic: {                       
                files: [{
                    expand: true,                  
                    cwd: 'src/',                   
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/'  
                }]
            }
        },

        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        //         '<%= grunt.template.today("yyyy-mm-dd") %> */',
        //         mangle: false
        //     },
        //     main: {
        //         files: {
        //             'dist/js/destination.min.js': ['src/js/jquery.min.js', 'src/js/modernizr.js', 'src/js/jquery.flexslider-min.js', 'src/js/owl-carousel.min.js', 'src/js/wow.min.js', 'src/js/scripts.js']
        //         }
        //     }
        // },

        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['Grunfile.js', 'src/js/scripts.js']
        },

        watch: {
            options: {
                livereload: true
            },
            stylesheets: {
                files: ['src/**/*.css', 'src/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            indexfile: {
                files: ['src/*.html'],
                tasks: ['copy:indexcopy']
            },
            // uglifyJs: {
            //     files: ['src/js/*.js'],
            //     tasks: ['uglify']
            // },
           jsfile: {
               files: ['src/js/*.js'],
               tasks: ['copy:jscopy']
           },
            images: {
                files: ['src/images/*.jpg', 'src/images/*.png', 'src/images/*.svg'],
                tasks: ['imagemin']
            }

        } 
        

	});

	grunt.registerTask('default', ['jshint', 'cssmin', 'less', 'copy', 'autoprefixer']);
    grunt.registerTask('build', ['default', 'bowercopy', 'modernizr']);
    grunt.registerTask('serve', ['connect', 'default', 'watch']);

};
