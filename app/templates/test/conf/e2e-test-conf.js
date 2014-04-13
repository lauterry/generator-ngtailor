module.exports = function (config) {

    config.set({
        frameworks: ['ng-scenario'],
        files: ['../e2e/**/*.js'],
        urlRoot: '/_karma_/',
        proxies: {
            '/': 'http://localhost:8887/'
        },
        autoWatch: false,
        singleRun: true,
        colors: true,
        logLevel: config.LOG_INFO,
        reporters: ['progress'],
        browsers: ['Chrome']
    });
};
