//var nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js'] //if you remove .js, webpack doesn't include node_modules required in  karma-test-shim
  },

  module: {
    loaders: [
    {
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader', 'angular2-template-loader']
    },
    {
      test: /\.html$/,
      loader: 'html-loader'

    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'null-loader'
    }, {
      test: /\.css$/,
      loader: 'null-loader'
    }]
  },
  node: {
    fs: "empty"
  },
  //target: 'node', // in order to ignore built-in modules like path, fs, etc. Using Karma, target is 'web'
  //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};
