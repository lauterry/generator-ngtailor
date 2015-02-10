module.exports = function(grunt) {

    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        assetsDir: 'app',
        distDir: 'dist',

        availabletasks: {
            tasks: {
                options: {
                    filter: 'include',
                    groups: {
                        'Development': ['dev'],
                        'Production': ['package'],
                        'Continuous Integration': ['ci']
                    },
                    sort: ['dev', 'test:unit', 'test:e2e', 'report', 'package', 'ci'],
                    descriptions: {
                        'dev' : 'Launch the static server and watch tasks',
                        'package' : 'Package your web app for distribution',
                        'ci' : 'Run unit & e2e tests, package your webapp and generate reports. Use this task for Continuous Integration'
                    },
                    tasks: ['dev', 'test:unit', 'test:e2e', 'report', 'package', 'ci']
                }
            }
        },
		wiredep: {
            target: {
                src: '<%= assetsDir %>/index.html',
                ignorePath: '<%= assetsDir %>/',
                jsPattern: '<script type="text/javascript" src="{{filePath}}"></script>',
                cssPattern: '<link rel="stylesheet" href="{{filePath}}" >'
            }
        },
        clean: {
            dist: ['.tmp', '<%= distDir %>']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= assetsDir %>',
                    dest: '<%= distDir %>/',
                    src: [
                        'index.html',
                        'img/**'
                    ]
                }]
            }
        },
		ngAnnotate: {
			options: {
				// Task-specific options go here.
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/js',
					src: '*.js',
					dest: '.tmp/concat/js'
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= distDir %>',
					src: ['index.html', '**/*.html'],
					dest: '<%= distDir %>'
				}]
			}
		},
        useminPrepare: {
            html: '<%= assetsDir %>/index.html',
            options: {
                dest: '<%= distDir %>'
            }
        },
        usemin: {
            html: '<%= distDir %>/index.html'
        },
		browserSync: {
            dev: {
                bsFiles: {
                    src : ['<%= assetsDir %>/**/*.html', '<%= assetsDir %>/**/*.js', '<%= assetsDir %>/**/*.css']
                },
                options: {
                    watchTask: true,
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: false, // must be false to avoid interfering with angular routing
                        forms: true
                    },
                    server: {
                        baseDir: "<%= assetsDir %>"
                    }
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all : {
                src : ['<%= assetsDir %>/js/**/*.js']
            }
        },
        watch: {
            options : {
                interrupt: true
            },
            js: {
                files: ['<%= assetsDir %>/js/**/*.js'],
                tasks: ['newer:jshint']
            },
            html : {
                files: ['<%= assetsDir %>/**/*.html']
            },
            css: {
                files: ['<%= assetsDir %>/css/**/*.css']
            }
        },
        connect: {
            test : {
                options: {
                    port: 8887,
					base: '<%= assetsDir %>',
					keepalive: false,
					livereload: false,
					open: false
                }
            }
        }
    });

	grunt.registerTask('ls', ['availabletasks']);

};
