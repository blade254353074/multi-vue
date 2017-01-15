const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const host = '0.0.0.0'
const port = 8080
const ip = require('../config/ip')
const webpackConfDev = require('./conf.dev')

const compiler = webpack(webpackConfDev)
const server = new WebpackDevServer(compiler, {
  hot: true,
  compress: true,
  historyApiFallback: {
    rewrites: [{
      from: /^\/([^/]+|(?!assets))(\/.*|\/$|$)/,
      to (context) {
        return `/${context.match[1]}.html`
      }
    }]
  },
  publicPath: '/',
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false
  }
})

server.listen(port, host, function (err) {
  if (err) return console.error(err)

  const filledIp = ip + new Array(15 - ip.length).join(' ')
  console.info(`
┌----------------------------------┐
├ local IP address: ${filledIp} ┤
|                                  |
├ Listening at ${host}:${port}        ┤
└----------------------------------┘
  `.trim(''))
})
