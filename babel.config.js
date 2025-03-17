module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { 
        jsxRuntime: 'automatic',
        runtime: 'automatic'
      }]
    ],
    plugins: [
      '@babel/plugin-transform-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  };
}; 