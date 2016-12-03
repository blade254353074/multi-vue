const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')

/* Config */
const urls = require('../urls')
const webpackConfProd = require('./conf.prod')

const webpackConf = merge(
  webpackConfProd,
  {
    output: {
      path: urls.docs,
      publicPath: '',
      filename: 'assets/js/[name].[chunkhash:8].js',
      chunkFilename: 'assets/js/[name].[chunkhash:8].js'
    }
  }
)

fs.writeFileSync(`${urls.temp}/config.doc.json`, JSON.stringify(webpackConf, null, 2), 'utf8')

module.exports = webpackConf
