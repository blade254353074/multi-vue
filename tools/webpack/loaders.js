const ExtractTextPlugin = require('extract-text-webpack-plugin')

// generate loader string to be used with extract text plugin
function generateLoaders (loaders, options) {
  const sourceLoader = loaders.map(function (loader) {
    const extraParamChar = /\?/.test(loader) ? '&' : '?'
    return loader + (options.sourceMap ? `${extraParamChar}sourceMap` : '')
  })

  return options.extract
    ? [ExtractTextPlugin.extract('vue-style', sourceLoader)]
    : ['vue-style', sourceLoader]
}

exports.css = function cssLoaders (options) {
  options = Object.assign({}, options)

  return {
    css: generateLoaders(['css'], options),
    postcss: generateLoaders(['css'], options),
    less: generateLoaders(['css', 'less'], options),
    sass: generateLoaders(['css', 'sass?indentedSyntax'], options),
    scss: generateLoaders(['css', 'sass'], options),
    stylus: generateLoaders(['css', 'stylus'], options),
    styl: generateLoaders(['css', 'stylus'], options)
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.style = function styleLoaders (options) {
  const loaders = exports.css(options)
  const output = []

  for (let ext in loaders) {
    output.push({
      test: new RegExp(`\\.${ext}$`),
      use: loaders[ext]
    })
  }

  return output
}
