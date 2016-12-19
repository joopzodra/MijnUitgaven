var webpackConfig = require('./webpack.test');

module.exports = function(config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [{
      pattern: './config/karma-test-shim.js',
      watched: false
    }],

    preprocessors: {
      './config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {      
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      progress: true,
      historyApiFallback: true,
      stats: 'minimal',
      inline: true
    },

    reporters: ['progress','html'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    htmlReporter: {
      pageTitle: 'Unit Tests',
      //subPageTitle: '__dirname NOG INVULLEN'
    }
  };

  config.set(_config);
};