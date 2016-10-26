const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')

/* Config */
const port = 8080
const ip = require('../config/ip')
const urls = require('../urls')
const webpackConfBase = require('./conf.base')
const loaders = require('./loaders')

/* Webpack Plugins */
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const Visualizer = require('webpack-visualizer-plugin')

const webpackConf = merge(webpackConfBase, {
  output: {
    filename: 'assets/js/[name].[chunkhash:8].js',
    chunkFilename: 'assets/js/[name].[chunkhash:8].js'
  },
  devtool: '#source-map',
  module: {
    rules: loaders.style({ sourceMap: true, extract: true })
  },
  profile: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
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
    new ExtractTextPlugin('assets/css/[name].[contenthash:8].min.css'),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.DedupePlugin(),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new Visualizer({ filename: `../tools/webpack/analytics.html` })
  ],
  recordsPath: `${urls.temp}/.webpack-records.json`
})

fs.writeFileSync(`${urls.temp}/config.prod.json`, JSON.stringify(webpackConf, null, 2), 'utf8')

module.exports = webpackConf
