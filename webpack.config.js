const path = require('path');
const babel = require('./babel.config.json');

module.exports = (env) => {
  let mode, config;
  if (env.production) {
    // Production Mode (--env production)
    mode = 'production';
    config = {};
  } else {
    // Development Mode
    mode = 'development';
    config = {
      devtool: 'eval-source-map',
      devServer: {
        static: {
          directory: path.join(__dirname, 'server/testing')
        },
        compress: true,
        port: 5001,
        open: true,
      }
    };
  }
  
  return {
    mode,
    entry: ['./src/index.js'],
    output: {
      filename: 'graphfinity.js',
      library: "graphfinity",
      libraryTarget: "var"
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: babel
          }
        }
      ]
    },
    ...config
  };
}