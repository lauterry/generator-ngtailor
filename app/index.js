'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var semver = require("semver");
var currentWorkingDirectory = path.basename(process.cwd());

var hasOption = function (options, option) {
	return options.indexOf(option) !== -1;
};

var NgtailorGenerator = yeoman.generators.Base.extend({

    init: function () {

		this.name = currentWorkingDirectory;
        this.angular_version = '*';
        this.version = '0.0.1';
        this.description = '';
        this.csslint = false;
        this.complexity = false;
        this.test = false;
        this.revision = false;
        this.gitignore = false;
        this.i18n = false;
        this.csspreprocessor = 'none';
        this.tests = false;
        this.imagemin = false;
        this.modules = [];
        this.thirdModules = [];
		this.importedModules = "[]";

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies({
					callback : this._gruntBowerInstall.call(this)
				});
            }
        });
    },

    /**
     * Ask for "Fast mode" or "Advanced mode"
     */
    askForMode: function() {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('You\'re using the fantastic ngTailor generator.'));

        this.log(chalk.magenta('ngTailor scaffold out an AngularJS application, writing your Grunt and Bower configurations with everything you need'));

        var prompts = [
            {
                type: "list",
                name: "mode",
                message: "Which mode do you want to run ?",
                choices: ["Fast", "Advanced"]
            }
        ];

        this.prompt(prompts, function (props) {
            this.mode = props.mode;
            done();
        }.bind(this));
    },

    launchAdvancedMode: function () {

        if(this.mode === "Advanced"){

            var done = this.async();

            var prompts = [
                {
                    type: "input",
                    name: "name",
                    message: "Name your project",
                    default: currentWorkingDirectory
                },
                {
                    type: "input",
                    name: "angular_version",
                    message: "Version of angular (leave blank to fetch the latest version available or specify one)",
                    validate: function (value) {
                        var valid = semver.validRange(value);
                        if (valid === null) {
                            return "Please enter a valid semantic version (semver.org)";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: "checkbox",
                    name: "modules",
                    message: "What official angular modules do you need ?",
					choices : [{
						value: 'resourceModule',
						name: 'angular-resource.js',
						checked: false
					}, {
						value: 'cookiesModule',
						name: 'angular-cookies.js',
						checked: false
					}, {
						value: 'sanitizeModule',
						name: 'angular-sanitize.js',
						checked: false
					}, {
						value: 'routeModule',
						name: 'angular-route.js',
						checked: false
					}, {
						value: 'touchModule',
						name: 'angular-touch.js',
						checked: false
					}, {
						value: 'i18nModule',
						name: 'angular-i18n.js',
						checked: false
					}, {
						value: 'animateModule',
						name: 'angular-animate.js',
						checked: false
					}]
                },
                {
                    type: "checkbox",
                    name: 'thirdModules',
                    message: 'What amazing angular modules do you need ?',
                    choices: [ "angular-ui-router", "angular-translate", "angular-snap", "revolunet-angular-carousel", "angular-bindonce" ]
                },
                {
                    type: "confirm",
                    name: "test",
                    message: "Should I set up tests configuration ?",
                    default: false
                },
                {
                    type: "checkbox",
                    name: "tests",
                    message: "Which tests should I set up ?",
                    choices: [ "unit", "e2e" ],
                    when: function (answers) {
                        return answers.test === true;
                    }
                },
                {
                    type: "confirm",
                    name: "revision",
                    message: "Rename JS & CSS files for browser caching purpose ?  (i.e. app.js becomes 8664d46sf64.app.js)",
                    default: false
                },
                {
                    type: "confirm",
                    name: 'csslint',
                    message: 'Should I lint your CSS with CSSLint',
                    default: false
                },
                {
                    type: "list",
                    name: 'csspreprocessor',
                    message: 'Should I set up one of those CSS preprocessors ?',
                    choices: [ "none", "sass", "less" ],
                    default: 0
                },
                {
                    type: "confirm",
                    name: "imagemin",
                    message: "Should I optimize your images (gif, png, jpeg) ?",
                    default: false
                },
                {
                    type: "confirm",
                    name: 'complexity',
                    message: 'Should I generate a complexity report for your project ?',
                    default: false
                }
            ];

            this.prompt(prompts, function (props) {
				this.name = props.name;
				this.angular_version = props.angular_version;
				this.version = props.version;
				this.description = props.description;
				this.csslint = props.csslint;
				this.complexity = props.complexity;
				this.test = props.test;
				this.revision = props.revision;
				this.gitignore = props.gitignore;
				this.i18n = props.i18n;
				this.csspreprocessor = props.csspreprocessor;
				this.tests = props.tests;
				this.imagemin = props.imagemin;
				this.modules = props.modules;
				this.thirdModules = props.thirdModules;

				console.log(props);

                done();
            }.bind(this));
        }
    },

    app: function () {
        this.mkdir('app');
		this.template('app/_index.html', 'app/index.html');
		this.template('app/css/app.css', 'app/css/app.css');
		this.template('app/js/controllers/mainController.js', 'app/js/controllers/mainController.js');
		this.template('app/js/app.js', 'app/js/app.js');

		if(hasOption(this.csspreprocessor, 'sass')){
			this.template('app/scss/style.scss', 'app/scss/style.scss');
			this.template('app/scss/app.scss', 'app/scss/app.scss');
		} else if (hasOption(this.csspreprocessor, 'less')) {
			this.template('app/less/style.less', 'app/less/style.less');
			this.template('app/less/app.less', 'app/less/app.less');
		}

        this.template('_package.json', 'package.json');
		this.template('_bower.json', 'bower.json');
		this.template('_Gruntfile.js', 'Gruntfile.js');
		this.template('_README.md', 'README.md');

    },

    configFiles: function () {
        this.copy('.editorconfig', '.editorconfig');
        this.copy('.jshintrc', '.jshintrc');
		this.copy('.bowerrc', '.bowerrc');
		this.copy('.gitignore', '.gitignore');
		if(this.csslint) {
			this.copy('.csslintrc', '.csslintrc');
		}
    },


	/***************
	 *   private   *
	 ***************/

	_gruntBowerInstall : function () {
		this.spawnCommand('grunt', ['bower-install'])
			.on('error', this._finalize)
			.on('exit', function (err) {
				if (err === 127) {
					this.log.error('Could not find Grunt. Please install with ' +
						'`npm install -g Grunt`.');
				}
				this._finalize(err);
			}.bind(this));
	},

	_finalize : function (err) {
		if(err){
			this.log.error(err);
		} else {
			this.log(chalk.green('OK'));
		}
	}
});

module.exports = NgtailorGenerator;