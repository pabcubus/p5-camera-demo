module.exports = function(grunt) {
	'use strict';

	const sass = require('node-sass');
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sass: {
			options: {
				implementation: sass,
				sourceMap: false
			},
			dev: {
				files: [
					{
					expand: true,
					cwd: 'styles/',
					src: ['*.scss', '!*.css'],
					dest: 'styles/',
					ext: '.min.css'
					}
				]
			},
		},
		shell: {
			serve: {
				command: 'serve -p 3000'
			}
		},
		watch: {
			sass: {
				files: ['**/*.scss'],
				tasks: ['sass:dev']
			}
		},
		concurrent: {
			serve: ['shell:serve', 'watch:sass']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('serve', [
		'sass:dev',
		'concurrent:serve'
	]);
};
