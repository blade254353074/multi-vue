const fs = require('fs')
const webpack = require('webpack')

/* Plugins */
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Happypack = require('happypack')
const loaders = require('./loaders')

/* vars */
const port = 8080
const urls = require('../urls')
const ip = require('../config/ip')
const config = require('../config')
const { NODE_ENV } = process.env

module.exports = {
  entry: Object.assign({
    'vendor': [
      'vue',
      'fastclick',
      urls.bootstrap // 页面初始化
    ]
  }, config.entry),
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
        loaders: loaders.css({ sourceMap: true, extract: NODE_ENV === 'production' }),
        postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
      }
    }, {
      test: /\.jsx?$/,
      loader: 'happypack/loader',
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'url',
      options: {
        limit: 1000,
        name: 'assets/imgs/[name].[hash:8].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      loader: 'url',
      options: {
        limit: 10000,
        name: 'assets/fonts/[name].[hash:8].[ext]'
      }
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  plugins: [
    new Happypack({
      loaders: ['babel?cacheDirectory'],
      tempDir: urls.temp
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    ...config.htmls.map(conf => new HtmlWebpackPlugin(conf))
  ]
}
