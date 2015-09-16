var path = require('path');
var webpack = require('webpack');

module.exports = {  
  entry: './src/index.js',
  plugins: [new webpack.optimize.UglifyJsPlugin()],
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
