'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var semver = require("semver");
var currentWorkingDirectory = path.basename(process.cwd());

var hasOption = function (options, option) {
	if(options){
		return options.indexOf(option) !== -1;
	} else {
		return false;
	}
};

var notes =
	'You can invoke ngTailor in 2 modes :' +
	'\n\n' +
	'° Fast mode : Generate you an angularjs project with the minimal options.' +
	'\n' +
	'° Advanced mode : Let you customize your scaffolding and add more features.' +
	'\n';

var final = '\n\nYour angular project has been successfully generated.' +
	'\nngTailor has prepared some revelant grunt tasks for you.' +
	'\nRun "grunt ls" to display them in your console.' +
	'\n\n',
	final2 = 'For more information about ngTailor and its grunt tasks, please see ' +
	'\n' +
	'https://github.com/lauterry/generator-ngtailor/blob/master/README.md' +
	'\n\n';

var NgtailorGenerator = yeoman.generators.Base.extend({

    init: function () {

		this.name = currentWorkingDirectory;
        this.angular_version = '*';
        this.version = '0.0.1';
        this.description = '';
        this.csslint = false;
        this.complexity = false;
        this.revision = false;
        this.gitignore = false;
        this.i18n = false;
		this.e2eTest = false;
		this.unitTest = false;
        this.csspreprocessor = 'none';
        this.imagemin = false;
		this.resourceModule = false;
		this.cookieModule = false;
		this.sanitizeModule = false;
		this.routeModule = false;
		this.i18nModule = false;
		this.animateModule = false;
		this.touchModule = false;
		this.uiRouterModule = false;
		this.translateModule = false;
		this.snapModule = false;
		this.carouselModule = false;
		this.bindonceModule = false;
		this.thirdModules = false;
		this.angularDeps = ""; 			// modules to import in angular.module()
		this.angularProviders = ""; 	// providers to inject in angular.module().config()

		this.packageGruntTasks = "";
		this.ciGruntTasks = "";
		this.devGruntTasks = "";

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies({
					callback : function() {
						this._gruntBowerInstall.call(this)
					}.bind(this)
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

        this.log(chalk.magenta('ngTailor scaffold out an AngularJS application, writing your Grunt and Bower configurations with everything you need'));

		this.log(chalk.cyan(notes));

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

			if(this.mode === "Fast") {
				this._prepareGruntTasks();
			}

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
						value: 'cookieModule',
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
                    choices: [{
						value: 'uiRouterModule',
						name: 'angular-ui-router.js',
						checked: false
					}, {
						value: 'translateModule',
						name: 'angular-translate.js',
						checked: false
					}, {
						value: 'snapModule',
						name: 'angular-snap.js',
						checked: false
					}, {
						value: 'carouselModule',
						name: 'angular-carousel.js',
						checked: false
					}, {
						value: 'bindonceModule',
						name: 'angular-bindonce.js',
						checked: false
					}]
                },
                {
                    type: "checkbox",
                    name: "tests",
                    message: "Which tests should I set up ?",
					choices: [ "unit", "e2e" ]
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
				this.i18n = props.i18n;
				this.csspreprocessor = props.csspreprocessor;
				this.tests = props.tests;
				this.imagemin = props.imagemin;
				this.thirdModules = props.thirdModules;

				this._handleModules(props.modules, props.thirdModules);
				this._setUpTests(props.tests);
				this._prepareGruntTasks();

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
			this.copy('app/scss/style.scss', 'app/scss/style.scss');
			this.copy('app/scss/app.scss', 'app/scss/app.scss');
		} else if (hasOption(this.csspreprocessor, 'less')) {
			this.copy('app/less/style.less', 'app/less/style.less');
			this.copy('app/less/app.less', 'app/less/app.less');
		}

		if(this.unitTest){
			this.template('test/conf/_unit-test-conf.js', 'test/conf/unit-test-conf.js');
			this.template('test/unit/appSpec.js', 'test/unit/appSpec.js');
		}

		if(this.e2eTest){
			this.copy('test/conf/e2e-test-conf.js', 'test/conf/e2e-test-conf.js');
			this.template('test/e2e/scenarios.js', 'test/e2e/scenarios.js');
		}

		if(this.unitTest || this.e2eTest){
			this.copy('test/.jshintrc', 'test/.jshintrc');
		}

        this.template('_package.json', 'package.json');
		this.template('_bower.json', 'bower.json');
		this.template('_Gruntfile.js', 'Gruntfile.js');
		this.template('_README.md', 'README.md');

    },

    configFiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
		this.copy('bowerrc', '.bowerrc');
		this.copy('gitignore', '.gitignore');
		if(this.csslint) {
			this.copy('csslintrc', '.csslintrc');
		}
    },


	/***************
	 *   private   *
	 ***************/

   	_handleModules : function (modules, thirdModules) {
		var angMods = [],
			angProviders = [];

		this.resourceModule = hasOption(modules, 'resourceModule');
		this.cookieModule = hasOption(modules,'cookieModule');
		this.sanitizeModule = hasOption(modules,'sanitizeModule');
		this.routeModule = hasOption(modules, 'routeModule');
		this.i18nModule = hasOption(modules, 'i18nModule');
		this.animateModule = hasOption(modules, 'animateModule');
		this.touchModule = hasOption(modules, 'touchModule');

		this.uiRouterModule = hasOption(thirdModules, 'uiRouterModule');
		this.translateModule = hasOption(thirdModules,'translateModule');
		this.snapModule = hasOption(thirdModules,'snapModule');
		this.carouselModule = hasOption(thirdModules, 'carouselModule');
		this.bindonceModule = hasOption(thirdModules, 'bindonceModule');

		if (this.resourceModule) {
			angMods.push("'ngResource'");
		}
		if (this.cookieModule) {
			angMods.push("'ngCookies'");
		}
		if (this.sanitizeModule) {
			angMods.push("'ngSanitize'");
		}
		if (this.routeModule) {
			angMods.push("'ngRoute'");
		}
		if (this.animateModule) {
			angMods.push("'ngAnimate'");
		}
		if (this.touchModule) {
			angMods.push("'ngTouch'");
		}

		if (this.uiRouterModule) {
			angMods.push("'ui.router'");
			angProviders.push("$stateProvider");
			angProviders.push("$urlRouterProvider");
		}
		if (this.translateModule) {
			angMods.push("'pascalprecht.translate'");
			angProviders.push("$translateProvider")
		}
		if (this.snapModule) {
			angMods.push("'snap'");
		}
		if (this.carouselModule) {
			angMods.push("'angular-carousel'");
		}
		if (this.bindonceModule) {
			angMods.push("'pasvaz.bindonce'");
		}

		if (angMods.length) {
			this.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n';
			this.angularProviders = angProviders.join(', ');
		}
	},

	_setUpTests : function(tests) {
		this.e2eTest = hasOption(tests, 'e2e');
		this.unitTest = hasOption(tests, 'unit');
	},

	_prepareGruntTasks : function() {

		var packageTasks = [],
			ciTasks = [],
			devTasks = [];


		/*****************
		 *  package Task *
		 *****************/
		packageTasks.push("'jshint'");
		packageTasks.push("'clean'");
		packageTasks.push("'useminPrepare'");
		packageTasks.push("'copy'");
		packageTasks.push("'concat'");
		packageTasks.push("'ngmin'");
		packageTasks.push("'uglify'");

		if(hasOption(this.csspreprocessor, 'sass')) {
			packageTasks.push("'sass'");
		} else if (hasOption(this.csspreprocessor, 'less')) {
			packageTasks.push("'less'");
		}
		packageTasks.push("'cssmin'");
		if(this.revision) {
			packageTasks.push("'rev'");
		}
		if(this.imagemin) {
			packageTasks.push("'imagemin'");
		}
		packageTasks.push("'usemin'");

		if (packageTasks.length) {
			this.packageGruntTasks = packageTasks.join(', ');
		}

		/*****************
		 *    ci Task    *
		 *****************/
		ciTasks.push("'package'");

		if(this.unitTest || this.e2eTest) {
			ciTasks.push("'connect:test'");
		}

		if(this.unitTest) {
			ciTasks.push("'karma:dist_unit:start'");
		}

		if(this.e2eTest) {
			ciTasks.push("'karma:e2e'");
		}

		if(this.complexity) {
			ciTasks.push("'plato'");
		}

		if (ciTasks.length) {
			this.ciGruntTasks = ciTasks.join(', ');
		}


		/*****************
		 *    dev Task   *
		 *****************/
		if(hasOption(this.csspreprocessor, 'sass')) {
			devTasks.push("'sass'");
		} else if (hasOption(this.csspreprocessor, 'less')) {
			devTasks.push("'less'");
		}
		devTasks.push("'browserSync'");

		if(this.unitTest) {
			devTasks.push("'karma:dev_unit:start'");
		}

		devTasks.push("'watch'");

		if (devTasks.length) {
			this.devGruntTasks = devTasks.join(', ');
		}

	},

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
			this.log(chalk.green(final));
			this.log(chalk.blue(final2));
		}
	}
});

module.exports = NgtailorGenerator;