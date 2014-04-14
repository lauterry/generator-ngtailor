/*global describe, beforeEach, it, require */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');

describe('advanced custom test', function () {

	var prompts = {};

	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'temp/advanced-custom-test'), function (err) {
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
			'imagemin' : true,
			'tests':[
				'unit',
				'e2e'
			]
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
			'app/less/style.less',
			'test/conf/unit-test-conf.js',
			'test/conf/e2e-test-conf.js',
			'test/e2e/scenarios.js',
			'test/unit/appSpec.js',
			'.jshintrc'

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

			assert.fileContent('package.json', /grunt-karma/);
			assert.fileContent('package.json', /karma-ng-html2js-preprocessor/);
			assert.fileContent('package.json', /karma-chrome-launcher/);
			assert.fileContent('package.json', /karma-firefox-launcher/);
			assert.fileContent('package.json', /karma-jasmine/);
			assert.fileContent('package.json', /karma-phantomjs-launcher/);
			assert.fileContent('package.json', /karma/);
			assert.fileContent('package.json', /karma-coverage/);
			assert.fileContent('package.json', /karma-ng-scenario/);

			assert.noFileContent('package.json', /grunt-contrib-sass/);


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
			assert.fileContent('Gruntfile.js', /bower-install/);
			assert.fileContent('Gruntfile.js', /clean/);
			assert.fileContent('Gruntfile.js', /copy/);
			assert.fileContent('Gruntfile.js', /ngmin/);
			assert.fileContent('Gruntfile.js', /useminPrepare/);
			assert.fileContent('Gruntfile.js', /usemin/);
			assert.fileContent('Gruntfile.js', /browserSync/);
			assert.fileContent('Gruntfile.js', /jshint/);
			assert.fileContent('Gruntfile.js', /watch/);
			assert.fileContent('Gruntfile.js', /rev/);
			assert.fileContent('Gruntfile.js', /csslint/);
			assert.fileContent('Gruntfile.js', /plato/);
			assert.fileContent('Gruntfile.js', /less/);
			assert.fileContent('Gruntfile.js', /imagemin/);
			assert.fileContent('Gruntfile.js', /karma/);

			assert.noFileContent('Gruntfile.js', /sass/);

			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('report', \['plato', 'connect:plato'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('dev', \['less', 'browserSync', 'karma:dev_unit:start', 'watch'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('package', \['jshint', 'clean', 'useminPrepare', 'copy', 'concat', 'ngmin', 'uglify', 'less', 'cssmin', 'rev', 'imagemin', 'usemin'\]\)/);
			assert.fileContent('Gruntfile.js', /grunt\.registerTask\('ci', \['package', 'connect:test', 'karma:dist_unit:start', 'karma:e2e', 'plato'\]\)/);
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
