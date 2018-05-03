const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackCriticalPlugin = require('./index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, 'build');

module.exports = {
  
  entry: {
    index: './test/cases/generate-critical-css/index.js'
  },

  output: {
    path: OUTPUT_DIR,
    filename: 'html-crtitical-webpack-plugin.js'
  },

  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextWebpackPlugin.extract({
        use: ['css-loader']
      })
    }]
  },

  plugins: [
    new HtmlWebpackPlugin(),

    new ExtractTextWebpackPlugin('styles.[chunkhash].css'),
    
    new HtmlWebpackCriticalPlugin({
      base: OUTPUT_DIR,
      src: 'index.html',
      dest: 'index.html',
      inline: true
    })
  ]
};