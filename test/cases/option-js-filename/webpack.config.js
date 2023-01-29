const path = require('path');
const HtmlBundlerPlugin = require('../../../');

module.exports = {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'js-override/[name].[contenthash:8].js',
  },

  resolve: {
    alias: {
      Scripts: path.join(__dirname, 'src/js/'),
    },
  },

  entry: {
    index: './src/index.html?lang=en',
    'de/index': './src/index.html?lang=de',
  },

  plugins: [
    new HtmlBundlerPlugin({
      js: {
        // this option must override the output.filename
        filename: 'js/[name].[contenthash:8].js',
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html/,
        loader: HtmlBundlerPlugin.loader,
      },
    ],
  },
};