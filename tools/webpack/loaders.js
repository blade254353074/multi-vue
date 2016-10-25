const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.css = function cssLoaders (options) {
  options = Object.assign({}, options)

  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    const sourceLoader = loaders.map(function (loader) {
      /* vue-loader 必须加 -loader 必须用字符串 */
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
      ? ExtractTextPlugin.extract({ fallbackLoader: 'vue-style-loader', loader: sourceLoader })
      : ['vue-style-loader', sourceLoader].join('!')
  }

  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.style = function styleLoaders (options) {
  const loaders = exports.css(options)
  const output = []

  for (let ext in loaders) {
    output.push({
      test: new RegExp(`\\.${ext}$`),
      loader: loaders[ext]
    })
  }

  return output
}
