const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const host = '0.0.0.0'
const port = 8080
const ip = require('../config/ip')
const urls = require('../urls')
const webpackConfDev = require('./conf.dev')

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, {
  hot: true,
  compress: true,
  noInfo: false,
  publicPath: '/',
  stats: {
    colors: true,
    displayModules: true,
    profile: false
  }
})

server.listen(port, host, function (err) {
  if (err) return console.error(err)

  console.info(`
┌------------------------------------┐
├ local IP address is: ${    ip    } ┤
|                                    |
├ Listening at ${host}:${port}          ┤
└------------------------------------┘
  `.trim(''))
})
