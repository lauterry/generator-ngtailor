# generator-ngtailor [![Build Status](https://secure.travis-ci.org/lauterry/generator-ngtailor.png?branch=master)](https://travis-ci.org/lauterry/generator-ngtailor)

Offers you a tailor-made workflow for your Angularjs Web App.

<img height="175" align="left" src="http://gruntjs.com/img/grunt-logo.svg">

<img height="175" align="left" src="http://bower.io/img/bower-logo.png">

<img height="175" align="left" src="http://yeoman.io/assets/img/yeoman-logo.a053.png">

<img height="175" align="left" src="https://s3.amazonaws.com/media-p.slid.es/uploads/hugojosefson/images/86267/angularjs-logo.png">


## Why is ngTailor interesting ?
You love Angularjs, Grunt, Bower and Yeoman ? You might be interested by ngTailor.
ngTailor scaffolds out a new Angularjs application, writing your Grunt and Bower configurations and prepare for you revelant Grunt tasks you needs.


## Features
* Let you choose the Angularjs modules you need.
* Your assets dependencies are managed by [bower](http://www.bower.io)
* Run [Brian Ford](https://twitter.com/briantford) [ng-min](https://github.com/btford/ngmin) before your minification
* Replace your scripts and stylesheets declaration with the minified version when packaging your app for production thanks to [http://yeoman.io/](Yeoman) [grunt-usemin](https://github.com/yeoman/grunt-usemin)
* Watch for you assets changes and automatically run `jshint` or `csslint` on your code and even unit tests.
* Livereload is out of the box. No F5 anymore
* Automatically output a hash in your assets file name for caching purpose.
* Set up unit and e2e tests with Karma and Jasmine and generate test coverage report.
* Automatically run `npm install && bower install && grunt bower-install` to download your project dependencies and import them in your index.html
* Compile you SASS | LESS files
* Visualize Javascript source complexity with [plato](https://github.com/es-analysis/plato). ([See an example of a plato report](http://es-analysis.github.io/plato/examples/grunt/))
* Optimize your images (png, jpeg, gif)
* Keep multiple browsers devices in sync using [grunt-browser-sync](https://github.com/shakyShane/browser-sync)


## ngTailor vs Yeoman generator-angular ?
Both aim to provide you a collection of tools and best practices to improve your productivity as a modern front end developer.
Yeoman generator-angular is great but in my opinion, it provides a bloated solution to manage and build angularjs applications.
ngTailor let you choose in a much more fine-grained way, each tools or components you want to be included in your application and workflow.
Note that ngTailor do not provide generator for directives, controllers etc like yeoman and generator-angular do.


## Getting Started
### Prerequisites
1. Install [node and npm](http://www.nodejs.org)
2. Install **yeoman** running `npm install -g yo`
3. If you are using npm below 1.2.10, run `npm install -g grunt-cli bower` to install **bower** and **grunt**
4. Install generator-ngtailor from npm running `npm install -g generator-ngtailor`

### Generate your Angular project
1. Create a new folder for your project
2. Open a terminal and run `yo ngtailor` in your project folder
3. Choose between "Fast mode" or "Advanced mode":
  * "Fast mode" : Generate an Angularjs project with the minimal options.
  * "Advanced mode" : Let you customize your scaffolding and add more features. Just answer to the prompted questions.
4. ngTailor will generate your Angularjs application and download all the dependencies by running ```npm install && bower install```
To check that everything is ok :
5. Run `grunt dev` to serve your static assets
6. Your should see "Yeahhh ! You're ready !" displayed in your browser
7. Voilà ! Your Angular project is ready ! Next step is to discover the workflow ngtailor offers to you.


## Workflow
### Development
* Run `grunt dev` to start a static web server and open your browser.
* Livereload will be automatically active meaning that you can see your modification on the browser without hitting F5.
* `jshint` and/or `csslint` will be run on your files when they change.
* If you choose to have unit tests, they will be run as your test and source files change.

### Package for Production
* Run `grunt package` to package your static assets for production.
* Your package will be generated in a `dist` folder and your javascripts and stylesheets will be concatenated, minified and versionned.

### Available Grunt tasks
* `grunt ls` : list and describe the available grunt tasks of your project.
* `grunt test:unit` : run karma unit tests and show test coverage in console.
* `grunt test:e2e` : run karma e2e tests
* `grunt report` : open complexity report in your browser
* `grunt ci`: launch `grunt package`, run unit tests and e2e test and generate complexity report. Use this task for continuous integration.

## Update ngTailor
* `npm update -g generator-ngtailor`

## Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
