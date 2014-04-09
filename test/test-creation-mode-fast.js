/*global describe, beforeEach, it, require */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('ngtailor generator - Fast Mode', function () {
	beforeEach(function (done) {
		helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
			if (err) {
				return done(err);
			}

			this.app = helpers.createGenerator('ngtailor:app', [
				'../../app'
			]);
			done();
		}.bind(this));
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
			'app/index.html',
			'app/css/app.css',
			'app/js/controllers/mainController.js',
			'app/js/app.js'
		];

		helpers.mockPrompt(this.app, {
			'mode': 'fast'
		});
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			helpers.assertFile(expected);
			done();
		});
	});

	it("don't create unexpected files", function (done) {
		var expected = [
			'.csslintrc',
			'app/less/app.less',
			'app/less/style.less',
			'app/scss/app.scss',
			'app/scss/style.scss',
		];

		helpers.mockPrompt(this.app, {
			'mode': 'fast'
		});
		this.app.options['skip-install'] = true;
		this.app.run({}, function () {
			helpers.assertNoFile(expected);
			done();
		});
	});
});
