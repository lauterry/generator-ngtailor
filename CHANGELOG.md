## 2.0.5 (May 19, 2014)

Enhancements:
  - Use Gruntfile Editor API to generate Gruntfile
  - Add custom yeoman greeting
  - Update to yeoman 0.17
  - Display success message and list available grunt tasks
  
Bug fixes:
  - missing angular-mocks in bower dev dependencies
  - grunt report was broken

## 2.0.4 (May 17, 2014)

Enhancements:

  - Add csslint in watch task
  - Add unit test in watch task
  - Add less and sass compilation in watch task
  - Update BrowserSync to 0.9.1
  - Update grunt-bower-install (depreciated) to grunt-wiredep

## 2.0.3 (April 16, 2014)

Enhancements:

  - Update gitignore
  - Upgrade package version to publish to npm registry

## 2.0.2 (April 16, 2014)

Enhancements:
  - Upgrade grunt-bower-install to 1.4.0

Bug fixes:
  - Cannot run grunt-bower-install after dependencies installation

## 2.0.1 (April 15, 2014)

Bug fixes:
  - files beginning with dot (.) are not fetched when installing from npm

## 2.0.0 (April 15, 2014)

Features
  - ngTailor becomes a yeoman generator

## 1.3.0 (March, 2014)

Features
  - Display available grunt tasks with `grunt ls`
  - Less is added to the list of pre processors

## 1.2.2 (February 11, 2014)

Enhancements:
  - moved sample controllers in a separate controllers folders
  - add default project README.md

Bug fixes:
  - useminPrepare destination folder is now parameterized (before, the folder was 'dist' by default)


## 1.2.1 (January 31, 2014)

Bug fixes:
  - Fix "broswer-sync interference with angular routing"

## 1.2.0 (January 30, 2014)

Features:
  - Add support for angular-carousel
  - Add support for angular-snap
  - Add support for angular-bindonce

Bug fixes:
  - Fix "Required config property "bower-install.target.src" missing."
  - Fix "angularjs script not imported in the index.html in the correct order"

## 1.1.0 (January 16, 2014)

Features:
  - Add support for keeping multiple browser devices in sync (grunt-contrib-connect is replaced with grunt-browser-sync)
  - Add support for grunt-contrib-imagemin to optimize images
  - Watch task is interruptable
  - Add support for angular-translate

Bug fixes:
  - Fix Karma tests dependencies was not dynamic
  - Fix jshint task fails when unused parameters in angular.module.config part

## 1.0.0 (December 31, 2013)

First release

Features:

  - Add support for common grunt task (uglify, concat, clean, copy)
  - Add support for CSSLint with grunt-csslint
  - Add support for JSHint with grunt-contrib-jshint
  - Add support for ngmin with grunt-ngmin
  - Add Sass support with grunt-contrib-sass
  - Replace your scripts and stylesheets declaration with the minified version with grunt-usemin
  - Add support for Karma and Jasmine
  - Choose your official angular modules
  - Add angular-ui to the external modules list
  - Add support for Plato to visualize your source complexity
  - Add watch and reload
  - Install bower and npm dependencies after the scaffolding and import them in the index.html using grunt-bower-install
