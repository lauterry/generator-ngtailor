<%= name %>
==================

## Prerequisites
1. Install [node and npm](http://www.nodejs.org)
2. Install **Grunt** running `npm install -g grunt-cli` 
3. Install **Bower** running `npm install -g bower`

## Developement
* Run `grunt dev` to start a static web server and open your browser.
* Livereload will be automatically active meaning that you can see your modification on the browser without hitting F5.
* `jshint` and/or `csslint` will be run on your files when they change.
* If you choose to have unit tests, they will be run as your test and source files change.

## Package for Production
* Run `grunt package` to package your static assets for production.
* Your package will be generated in a `dist` folder and your javascripts and stylesheets will be concatenated, minified and versionned.
* `grunt` : launch `grunt package`, run unit tests and e2e test and generate complexity report. Use this task for continuous integration.

## Available Grunt tasks
* `grunt test:unit` : run karma unit tests and show test coverage in console.
* `grunt test:e2e` : run karma e2e tests
* `grunt report` : open complexity report in your browser