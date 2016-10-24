const fs = require('fs')
const webpack = require('webpack')

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
  }
}
