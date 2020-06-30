const HtmlWebpackCriticalPlugin = require('../../../src/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {

  mode: 'production',

  entry: {
    index: path.resolve(__dirname, 'index.js')
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].bundle.js'
  },

  module: {
    rules: [{
      test: /\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),

    new MiniCssExtractPlugin(),

    new HtmlWebpackCriticalPlugin({
      base: path.resolve(__dirname, 'build'),
      src: 'index.html',
      target: 'index.html',
      inline: true
    })
  ]
};