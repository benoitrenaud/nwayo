//-------------------------------------
//-- Default
//-------------------------------------
'use strict';

let runsequence = require('run-sequence');
let inquirer    = require('inquirer');
let gulp        = require('gulp');
//let debug = require('gulp-debug');

const echo = console.log;
const ENV  = global.nwayo.env;




//-- Default menu
gulp.task('default', cb => {

	echo('\n');
	echo(` ${ENV.pkg.name} `.bgGreen.bold + `    [nwayo ${ENV.pkg.nwayo.version}]`.yellow);
	echo('');

	inquirer.prompt([{
		name:    'task',
		message: 'Alo! Ki sa ou vle?',
		type:    'list',
		choices: [
			{ name:'Everything',       value:'rebuild' },
			{ name:'Scripts & styles', value:'rebuild-ss' },
			new inquirer.Separator(),
			{ name:'Assets only',      value:'assets' },
			{ name:'Icons only',       value:'icons' },
			{ name:'Scripts only',     value:'scripts' },
			{ name:'Styles only',      value:'styles' },
			{ name:'Local only',       value:'local' }
		]
	}], data => {
		echo('\n\n');
		runsequence(data.task, cb);
	});
});
