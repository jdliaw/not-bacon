var webpack = require('webpack');

module.exports = {
  entry: {
    react_app: './react_app/index.js',
  },
  output: {
    path: './app/assets/javascripts',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]"} ,
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, loader: "babel-loader?stage=0", exclude: '/node_modules/' },
      { test: /\.jsx$/, loaders: ['jsx-loader', "babel-loader?stage=0"] }
    ]
  },
  plugins: []
};
