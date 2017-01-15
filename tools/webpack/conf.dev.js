const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')

/* Config */
const port = 8080
const ip = require('../config/ip')
const urls = require('../urls')
const webpackConfBase = require('./conf.base')

/* Webpack Plugins */
const DashboardPlugin = require('webpack-dashboard/plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const webpackConf = merge(webpackConfBase, {
  entry: {
    '[dev]': [
      `webpack-dev-server/client?http://${ip}:${port}`,
      'webpack/hot/dev-server'
    ]
  },
  cache: true,
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new DashboardPlugin(),
    new OpenBrowserPlugin({ url: `http://localhost:${port}/` })
  ]
})

fs.writeFileSync(`${urls.temp}/config.dev.json`, JSON.stringify(webpackConf, null, 2), 'utf8')

module.exports = webpackConf
