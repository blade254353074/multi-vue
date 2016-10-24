const fs = require('fs')
const webpack = require('webpack')

/* Plugins */
const autoprefixer = require('autoprefixer')
const loaders = require('./loaders')

/* vars */
const port = 8080
const urls = require('../urls')
const ip = require('../config/ip')
const config = require('../config')

module.exports = {
  entry: {
    'vendor': [
      'fastclick',
      urls.bootstrap // 页面初始化
    ]
  },
  output: {
    path: urls.build,
    publicPath: '/',
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/chunk.[name].js'
  },
  resolve: {
    extensions: ['', 'js', 'vue'],
    fallback: urls.node_modules,
    alias: {
      Components: urls.components,
      Assets: urls.assets
    }
  },
  resolveLoader: {
    root: urls.node_modules
  },
  module: {
    rules: [{
      test: /\.vue$/,
      enforce: "pre",
      loader: 'standard',
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.vue$/,
      loader: 'vue',
      options: {
        loaders: loaders.css(),
        postcss: [autoprefixer({ browsers: ['last 2 versions'] })] // TODO
      }
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'url',
      options: {
        limit: 1000,
        name: 'assets/imgs/[name].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      loader: 'url',
      options: {
        limit: 10000,
        name: 'assets/fonts/[name].[ext]'
      }
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  }
}
