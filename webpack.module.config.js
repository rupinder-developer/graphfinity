const { module: _module } = require('./webpack.config');

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  output: {
    filename: 'graphfinity.module.js',
    libraryTarget: 'module'
  },
  experiments: {
    outputModule: true,
  },
  module: _module
}
