const path = require('path');
const { module: _module } = require('./webpack.config');

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    library: "graphfinity",
    libraryTarget: "var"
  },
  module: _module,
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'server/testing')
    },
    compress: true,
    port: 5001,
    open: true,
  }
}