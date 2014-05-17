/*global describe, beforeEach, it, require */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');

describe('advanced default', function () {

	var prompts = {};

	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'temp/advanced-default'), function (err) {
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
			'csslint' : false,
			'complexity' : false,
			'test' : false,
			'revision' : false,
			'gitignore' : false,
			'i18n' : false,
			'csspreprocessor' : 'none',
			'tests' : [],
			'imagemin' : false
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
			'app/js/app.js'
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
			'.csslintrc',
			'app/less/app.less',
			'app/less/style.less',
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

			assert.noFileContent('package.json', /grunt-karma/);
			assert.noFileContent('package.json', /karma-ng-html2js-preprocessor/);
			assert.noFileContent('package.json', /karma-chrome-launcher/);
			assert.noFileContent('package.json', /karma-firefox-launcher/);
			assert.noFileContent('package.json', /karma-jasmine/);
			assert.noFileContent('package.json', /karma-phantomjs-launcher/);
			assert.noFileContent('package.json', /karma/);
			assert.noFileContent('package.json', /karma-coverage/);
			assert.noFileContent('package.json', /karma-ng-scenario/);
			assert.noFileContent('package.json', /grunt-rev/);
			assert.noFileContent('package.json', /grunt-contrib-sass/);
			assert.noFileContent('package.json', /grunt-contrib-less/);
			assert.noFileContent('package.json', /grunt-contrib-csslint/);
			assert.noFileContent('package.json', /grunt-contrib-imagemin/);
			assert.noFileContent('package.json', /grunt-plato/);

			done();
		});
	});

	it("bower.json content", function (done) {

		helpers.mockPrompt(this.app, prompts);
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.fileContent('bower.json', /"angular": "2\.0\.0"/);
			assert.noFileContent('bower.json', /angular-mocks: "2\.0\.0"/);
			assert.noFileContent('bower.json', /"angular-i18n": "2\.0\.0"/);
			assert.noFileContent('bower.json', /angular-touch: "2\.0\.0"/);
			assert.noFileContent('bower.json', /angular-sanitize: "2\.0\.0"/);
			assert.noFileContent('bower.json', /angular-resource: "2\.0\.0"/);
			assert.noFileContent('bower.json', /angular-animate: "2\.0\.0"/);
			assert.noFileContent('bower.json', /angular-cookies: "2\.0\.0"/);
			assert.noFileContent('bower.json', /angular-route: "2\.0\.0"/);
			assert.noFileContent('bower.json', /"angular-ui-router"/);
			assert.noFileContent('bower.json', /"angular-translate"/);
			assert.noFileContent('bower.json', /"angular-snap"/);
			assert.noFileContent('bower.json', /"revolunet-angular-carousel"/);
			assert.noFileContent('bower.json', /"angular-bindonce"/);

			done();
		});
	});

	it("gruntfile.js content", function (done) {

		helpers.mockPrompt(this.app, prompts);
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.fileContent('Gruntfile.js', /availabletasks/);
			assert.fileContent('Gruntfile.js', /wiredep/);
			assert.fileContent('Gruntfile.js', /clean/);
			assert.fileContent('Gruntfile.js', /copy/);
			assert.fileContent('Gruntfile.js', /ngmin/);
			assert.fileContent('Gruntfile.js', /useminPrepare/);
			assert.fileContent('Gruntfile.js', /usemin/);
			assert.fileContent('Gruntfile.js', /browserSync/);
			assert.fileContent('Gruntfile.js', /jshint/);
			assert.fileContent('Gruntfile.js', /watch/);

			assert.noFileContent('Gruntfile.js', /rev/);
			assert.noFileContent('Gruntfile.js', /csslint/);
			assert.noFileContent('Gruntfile.js', /karma/);
			assert.noFileContent('Gruntfile.js', /plato/);
			assert.noFileContent('Gruntfile.js', /sass/);
			assert.noFileContent('Gruntfile.js', /less/);
			assert.noFileContent('Gruntfile.js', /imagemin/);

			assert.noFileContent('Gruntfile.js', /grunt\.registerTask\('report', \['plato', 'connect:plato'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('dev', \['browserSync', 'watch'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('package', \['jshint', 'clean', 'useminPrepare', 'copy', 'concat', 'ngmin', 'uglify', 'cssmin', 'usemin'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('ci', \['package'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('ls', \['availabletasks'\]\)/);

			done();
		});
	});

	it("app.js content", function (done) {

		helpers.mockPrompt(this.app, prompts);
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			assert.fileContent('app/js/app.js', /angular\.module\('MyApp'/);
			assert.noFileContent('app/js/app.js', /angular\.module\('MyApp'\)\.config\(function\(\$stateProvider, \$urlRouterProvider, \$translateProvider/);
			done();
		});
	});

});
