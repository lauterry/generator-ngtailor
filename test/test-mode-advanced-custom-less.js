/*global describe, beforeEach, it, require */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');

describe('advanced custom less', function () {

	var prompts = {};

	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'temp/advanced-custom-less'), function (err) {
			if (err) {
				return done(err);
			}

			this.app = helpers.createGenerator('ngtailor:app', [
				'../../../app'
			]);
			done();
		}.bind(this));

		prompts = {
			'mode': 'Advanced',
			'name' : "MyApp",
			'angular_version' : '2.0.0',
			'version' : '0.0.1',
			'description' : 'A Great App',
			'csslint' : true,
			'complexity' : true,
			'test' : false,
			'revision' : true,
			'gitignore' : true,
			'i18n' : true,
			'csspreprocessor' : 'less',
			'tests' : [],
			'imagemin' : true
		}

	});

	it('creates expected files', function (done) {
		var expected = [
			'.jshintrc',
			'.editorconfig',
			'.gitignore',
			'package.json',
			'bower.json',
			'.bowerrc',
			'README.md',
			'Gruntfile.js',
			'app/index.html',
			'app/css/app.css',
			'app/js/controllers/mainController.js',
			'app/js/app.js',
			'.csslintrc',
			'app/less/app.less',
			'app/less/style.less'

		];

		helpers.mockPrompt(this.app, prompts);
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.file(expected);
			done();
		});
	});

	it("don't create unexpected files", function (done) {
		var expected = [
			'app/scss/app.scss',
			'app/scss/style.scss'
		];

		helpers.mockPrompt(this.app, prompts);
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.noFile(expected);
			done();
		});
	});

	it("package.json content", function (done) {

		helpers.mockPrompt(this.app, prompts);
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {

			assert.fileContent('package.json', /"name": "my-app"/);
			assert.fileContent('package.json', /"version": "0\.0\.1"/);

			assert.fileContent('package.json', /grunt-usemin/);
			assert.fileContent('package.json', /grunt-ngmin/);
			assert.fileContent('package.json', /grunt-contrib-clean/);
			assert.fileContent('package.json', /grunt-contrib-concat/);
			assert.fileContent('package.json', /grunt-contrib-uglify/);
			assert.fileContent('package.json', /grunt-contrib-cssmin/);
			assert.fileContent('package.json', /grunt-contrib-watch/);
			assert.fileContent('package.json', /grunt-bower-task/);
			assert.fileContent('package.json', /grunt-contrib-copy/);
			assert.fileContent('package.json', /grunt-contrib-jshint/);
			assert.fileContent('package.json', /grunt-rev/);
			assert.fileContent('package.json', /grunt-contrib-less/);
			assert.fileContent('package.json', /grunt-contrib-csslint/);
			assert.fileContent('package.json', /grunt-contrib-imagemin/);
			assert.fileContent('package.json', /grunt-plato/);

			assert.noFileContent('package.json', /grunt-karma/);
			assert.noFileContent('package.json', /karma-ng-html2js-preprocessor/);
			assert.noFileContent('package.json', /karma-chrome-launcher/);
			assert.noFileContent('package.json', /karma-firefox-launcher/);
			assert.noFileContent('package.json', /karma-jasmine/);
			assert.noFileContent('package.json', /karma-phantomjs-launcher/);
			assert.noFileContent('package.json', /karma/);
			assert.noFileContent('package.json', /karma-coverage/);
			assert.noFileContent('package.json', /karma-ng-scenario/);
			assert.noFileContent('package.json', /grunt-contrib-sass/);


			done();
		});
	});

	it("bower.json content", function (done) {

		helpers.mockPrompt(this.app, prompts);
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.fileContent('bower.json', /"angular": "2\.0\.0"/);
			assert.fileContent('bower.json', /"angular-i18n": "2\.0\.0"/);
			assert.noFileContent('bower.json', /angular-mocks/);
			assert.noFileContent('bower.json', /angular-\w/);

			done();
		});
	});

	it("gruntfile.js content", function (done) {

		helpers.mockPrompt(this.app, prompts);
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.fileContent('Gruntfile.js', /availabletasks/);
			assert.fileContent('Gruntfile.js', /bower-install/);
			assert.fileContent('Gruntfile.js', /clean/);
			assert.fileContent('Gruntfile.js', /copy/);
			assert.fileContent('Gruntfile.js', /ngmin/);
			assert.fileContent('Gruntfile.js', /useminPrepare/);
			assert.fileContent('Gruntfile.js', /usemin/);
			assert.fileContent('Gruntfile.js', /browser_sync/);
			assert.fileContent('Gruntfile.js', /jshint/);
			assert.fileContent('Gruntfile.js', /watch/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('dev', \['browser_sync', 'watch'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('package', \['jshint', 'clean', 'useminPrepare', 'copy', 'concat', 'ngmin', 'uglify', 'cssmin', 'usemin'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('ci', \['package'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('ls', \['availabletasks'\]\)/);
			assert.fileContent('Gruntfile.js', /rev/);
			assert.fileContent('Gruntfile.js', /csslint/);
			assert.fileContent('Gruntfile.js', /plato/);
			assert.fileContent('Gruntfile.js', /less/);
			assert.fileContent('Gruntfile.js', /imagemin/);

			assert.noFileContent('Gruntfile.js', /karma/);
			assert.noFileContent('Gruntfile.js', /sass/);

			done();
		});
	});


});
