const path = require('path');
const HtmlBundlerPlugin = require('../../../');
const { FaviconsBundlerPlugin } = require('../../../plugins');

// load plugin as CJS or ESM
//const { FaviconsBundlerPlugin } = require('html-bundler-webpack-plugin/plugins');
//import { FaviconsBundlerPlugin } from 'html-bundler-webpack-plugin/plugins';

module.exports = {
  mode: 'production',
  //mode: 'development',

  output: {
    path: path.join(__dirname, 'dist/'),
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: './src/views/home/index.html',
        about: './src/views/pages/about/index.html', // test the same favicon file but with diff relative path
      },
      js: {
        filename: '[name].bundle.js',
      },
      css: {
        filename: '[name].bundle.css',
      },
    }),
    // test custom bundler plugin
    new FaviconsBundlerPlugin({
      enabled: 'auto', // true, false, auto (default) - generate favicons in production mode only
      // favicons configuration options, see https://github.com/itgalaxy/favicons#usage
      faviconOptions: {
        path: '/img/favicons',
        appName: 'My App',
        icons: {
          android: false, // Create Android homescreen icon.
          appleIcon: false, // Create Apple touch icons.
          appleStartup: false, // Create Apple startup images.
          favicons: true, // Create regular favicons.
          windows: false, // Create Windows 8 tile icons.
          yandex: false, // Create Yandex browser icon.
        },
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader'],
      },

      {
        test: /\.(png|jpe?g|ico|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
      },
    ],
  },
};
