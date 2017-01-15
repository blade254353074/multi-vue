const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.css = function cssLoaders (options) {
  function generateLoaders (...loaders) {
    loaders.unshift('css')
    if (options.style) loaders.splice(1, 0, 'postcss')
    const sourceLoader = loaders.map(loader => {
      let extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = `${loader}-loader`
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? `${extraParamChar}sourceMap` : '')
    }).join('!')

    return options.extract
      ? ExtractTextPlugin.extract({
        fallbackLoader: 'vue-style-loader',
        loader: sourceLoader
      })
      : ['vue-style-loader', sourceLoader].join('!')
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass?indentedSyntax'),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.style = function styleLoaders (options) {
  const loaders = exports.css(Object.assign({ style: true }, options))
  const output = []

  for (let ext in loaders) {
    output.push({
      test: new RegExp(`\\.${ext}$`),
      loaders: loaders[ext]
    })
  }

  return output
}
