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
      'vue',
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
    extensions: ['.js', '.jsx', '.vue', '.css', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.json', '.html'],
    alias: {
      components: urls.components,
      assets: urls.assets
    }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      enforce: "pre",
      loader: 'standard',
      exclude: /(node_modules|bower_components)/
    }/*, {
      test: /\.vue$/,
      enforce: "pre",
      loader: 'standard',
      exclude: /(node_modules|bower_components)/
    }*/, {
      test: /\.vue$/,
      loader: 'vue',
      options: {
        loaders: loaders.css(),
        postcss: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ] // TODO
      }
    }, {
      test: /\.jsx?$/,
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
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  }
}
