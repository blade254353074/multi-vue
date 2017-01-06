const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')

/* Webpack Plugins */
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/* Config */
const port = 8080
const ip = require('../config/ip')
const urls = require('../urls')
const webpackConfBase = require('./conf.base')

const webpackConf = merge(webpackConfBase, {
  output: {
    filename: 'assets/js/[name].[chunkhash:8].js',
    chunkFilename: 'assets/js/[name].[chunkhash:8].js'
  },
  // devtool: '#source-map',
  profile: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BABEL_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
        collapse_vars: true,
        reduce_vars: true
      },
      output: { comments: false },
      sourceMap: false // default is false
    }),
    new ImageminPlugin({
      disable: false,
      optipng: { optimizationLevel: 3 },
      gifsicle: { optimizationLevel: 1 },
      jpegtran: { progressive: false },
      svgo: { plugins: [{ removeViewBox: false }] },
      pngquant: { quality: '70-85' },
      plugins: [imageminMozjpeg({ quality: 90 })]
    }),
    new ExtractTextPlugin('assets/css/[name].[contenthash:8].css'),
    new webpack.HashedModuleIdsPlugin(),
    new BundleAnalyzerPlugin()
  ],
  recordsPath: urls.recordsPath
})

fs.writeFileSync(`${urls.temp}/config.prod.json`, JSON.stringify(webpackConf, null, 2), 'utf8')

module.exports = webpackConf
