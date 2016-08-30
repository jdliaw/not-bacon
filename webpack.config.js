var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'app/assets/javascripts');
var APP_DIR = path.resolve(__dirname, 'react_app/src');

module.exports = {
  entry: {
    react_app: APP_DIR + '/index.js'
  },
  output: {
    path: BUILD_DIR,
    filename: 'react.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
