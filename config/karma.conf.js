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

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome']
  };

  config.set(_config);
};