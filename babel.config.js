const jsConfig = require('./jsConfig.json');

module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['@babel/preset-env'],
    plugins: [
      ['module-resolver', { 
        root: [jsConfig.compilerOptions.baseUrl]
      }]
    ]
  };
}