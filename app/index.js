'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var semver = require("semver");
var currentWorkingDirectory = path.basename(process.cwd());

var NgtailorGenerator = yeoman.generators.Base.extend({

    init: function () {
        this.pkg = require('../package.json');

        // default options
        this.options = {
            name : currentWorkingDirectory,
            angular_version : '*',
            version : '0.0.1',
            description : '',
            csslint : false,
            complexity : false,
            test : false,
            revision : false,
            gitignore : false,
            i18n : false,
            csspreprocessor : 'none',
            tests : false,
            imagemin : false,
            modules : [],
            thirdModules : []
        };

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
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
        this.log(chalk.magenta('You\'re using the fantastic Ngtailor generator.'));

        this.log(chalk.magenta('ngtailor scaffold out an AngularJS application, writing your Grunt and Bower configurations with everything you need'));

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

    askFor: function () {

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
                    choices: [ "i18n", "route", "resource", "animate", "cookies", "sanitize", "touch" ]
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
                console.log(props);
                this.someOption = props.someOption;

                done();
            }.bind(this));
        }

    },

    app: function () {
        this.mkdir('app');

        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = NgtailorGenerator;