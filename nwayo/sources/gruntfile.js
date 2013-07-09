module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// js
		jshint: {
			core_js: {
				src: ['js/**/*.js', '!libs/**/*.js', '!js/plugins/**/*.js']
			}
		},
		requirejs: {
			core_js: {
				options: {
					baseUrl:  './',
					name:     'js/core',
					include:  ['js/variants'],
					out:      '../assets/builds/core.js',
					optimize: 'uglify', // 'none'
					preserveLicenseComments: false,
					skipModuleInsertion:     true,
					findNestedDependencies:  true,
					pragmasOnSave:           { excludeRequire: true }
				}
			}
		},
		templateclient: {
			core_jshtml: {
				options: {
					variable: 'nwayo_jshtml',
					prefix: 'window.kafe.dependencies.jQuery.templates(',
					suffix: ')'
				},
				src: ['tmpl/**/*.jshtml'],
				dest: '../assets/builds/templateclient.tmp.js'
			}
		},


		// less css
		less: {
			core_less: {
				files: { '../assets/builds/core-less.tmp.css': 'less/loader.less' }
			},
			editor_less: {
				files: { '../assets/builds/editor.css': 'less/extras/editor.less' },
				options: { yuicompress:true }
			}
		},
		cssmin: {
			core_css: {
				files: {
					'../assets/builds/core.css': [
						'less/libs/reset.css',
						'less/libs/normalize.css',
						'less/libs/html5boilerplate.css',
						'../assets/builds/core-less.tmp.css'
					]
				}
			}
		},


		// cleaner
		clean: {
			builds_tmp: {
				src: ['../assets/builds/*.tmp.*'],
				options: {
					force: true
				}
			}
		},


		// watcher
		watch: {
			all: {
				files: ['gruntfile.js', 'package.json'],
				tasks: 'default'
			},
			core_js: {
				files: ['js/**/*.js', 'libs/**/*.js', 'tmpl/**/*.jshtml'],
				tasks: 'core_js'
			},
			core_less: {
				files: ['less/**/*.less', 'less/**/*.css', '!less/extras/**/*.less'],
				tasks: 'core_less'
			},
			less_editor: {
				files: ['less/extras/editor.less'],
				tasks: 'editor_less'
			}
		}
	});



	// load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-template-client');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// tasks
	grunt.registerTask('core_js',     ['templateclient:core_jshtml','jshint:core_js','requirejs:core_js','clean:builds_tmp']);
	grunt.registerTask('core_less',   ['less:core_less','cssmin:core_css','editor_less','clean:builds_tmp']);
	grunt.registerTask('editor_less', ['less:editor_less']);
	grunt.registerTask('default',     ['core_js','core_less']);
};

