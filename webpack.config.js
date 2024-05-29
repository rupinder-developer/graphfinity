import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export default function (env) {
  let mode, config;
  if (env.production) {
    // Production Mode (--env production)
    mode = 'production';
    config = {};
  } else {
    // Development Mode
    mode = 'development';
    config = {
      devtool: 'inline-source-map',
      devServer: {
        static: {
          directory: 'server/testing'
        },
        compress: true,
        port: 5001,
        open: true,
      }
    };
  }

  return {
    mode,
    entry: ['./src/index.ts'],
    output: {
      filename: 'graphfinity.js',
      library: "graphfinity",
      libraryTarget: "var"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /(node_modules|bower_components)/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()]
    },
    ...config
  };
};