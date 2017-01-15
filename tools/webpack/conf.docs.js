const fs = require('fs')
const merge = require('webpack-merge')

/* Config */
const urls = require('../urls')
const webpackConfProd = require('./conf.prod')

const webpackConf = merge(
  webpackConfProd,
  {
    output: {
      path: urls.docs,
      publicPath: ''
    }
  }
)

fs.writeFileSync(`${urls.temp}/config.docs.json`, JSON.stringify(webpackConf, null, 2), 'utf8')

module.exports = webpackConf
