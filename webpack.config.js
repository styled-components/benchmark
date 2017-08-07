const { join } = require('path');

module.exports = {
  entry: {
    browser: './tests/browser.js',
    native: './tests/native.js',
  },
  output: {
    filename: 'compiled/[name].js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    alias: {
      'react-native$': join(__dirname, 'mocks/react-native'),
    },
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
    ],
  },
};
