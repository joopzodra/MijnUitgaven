var watch = require('@ionic/app-scripts/dist/watch');
var copy = require('@ionic/app-scripts/dist/copy');
var copyConfig = require('@ionic/app-scripts/config/copy.config');

// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'srcFiles' or 'copyConfig'
// then provide an object with the paths, options, and callback fields populated per the Chokidar docs
// https://www.npmjs.com/package/chokidar

module.exports = {
  srcFiles: {
    paths: ['{{SRC}}/**/*.(ts|html|scss)'],
    options: {
      ignored: ['{{SRC}}/**/*.spec.ts', '**/*.DS_Store'],
      usePolling: true,
      interval: 300,
      binaryInterval: 300
    },
    callback: watch.buildUpdate
  },
  copyConfig: copy.copyConfigToWatchConfig()
};