# Multi Vue

Multi Vue applications.

With the newest enviroment(2016-10-26):

* webpack@^2.1.0-beta.25
* webpack-dev-server@2.1.0-beta.9
* extract-text-webpack-plugin@2.0.0-beta.4
* vue@^2.0.3

Have these features:

* multi entry, multi vue app;
* vue-jsx
* long-term cache
* 1px in every device (rem.js)
* webpack 2 config

Use these loader to build apps:

* babel-loader
* css-loader
* file-loader
* html-loader
* json-loader
* postcss-loader
* sass-loader
* standard-loader
* url-loader
* vue-loader
* vue-style-loader

Use these plugins to assist develop:

* yarn
* standardjs
* webpack-dashboard
* open-browser-webpack-plugin

And these for production:

* extract-text-webpack-plugin
* webpack-manifest-plugin
* webpack-md5-hash
* imagemin-webpack-plugin
* imagemin-mozjpeg
* webpack-visualizer-plugin

Upgrade webpack 1.x to webpack 2.x, these pages are helpful:

* [How to Upgrade from Webpack 1?](https://webpack.js.org/how-to/upgrade-from-webpack-1/)
* [What's new in webpack 2](https://gist.github.com/sokra/27b24881210b56bbaff7)
* [postcss-loader#webpack-2x-config](https://github.com/postcss/postcss-loader#webpack-2x-config)
* [configurations/advanced | vue-loader](http://vue-loader.vuejs.org/en/configurations/advanced.html)
* [features/postcss | vue-loader](http://vue-loader.vuejs.org/en/features/postcss.html)

# How to start:

```bash
$ yarn          # or npm install
$ npm start     # for development
$ npm run build # for production
```

# Problems about webpack 1.x to 2.x:

I have some tips to metion you:

##### 1. Evenything beta with webpack 2.x:

* webpack@^2.1.0-beta.25
* webpack-dev-server@2.1.0-beta.9
* extract-text-webpack-plugin@2.0.0-beta.4

##### 2. webpack config changes:

Now webpack understands import and export without them being transformed to CommonJS,  
You can change `.babelrc` to tell Babel to not parse es6 module.
```json
{
  "presets": [
    ["es2015", { "modules": false }]
  ]
}
```

We can use system.import to dynamic loading modules.  
Your browser must support Promise, for old browser you can use `es6-promise` to polyfill.

```javascript
Promise.all([
  System.import('vue'),
  System.import('./App')
])
  .then(([Vue, App]) => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      render: h => h(App.default)
    })
  })
  .catch(err => {
    console.error(err)
  })
```

A few config true into webpack.LoaderOptionsPlugin like:  
debug, uglify minimize, third part loader options...

```javascript
new webpack.LoaderOptionsPlugin({
  debug: false,   // debug
  minimize: true, // Uglify minimize options
  options: {
    context: urls.project, // sass-loader need this
    // vue & postcss options must write to here
    vue: {
      loaders: loaders.css({ sourceMap: true, extract: prod }),
      postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
    },
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
  }
})
```

UglifyJsPlugin sourceMap now defaults to false,  
if you need sourceMap in production, you need to pass `sourceMap: true`.

```javascript
new UglifyJsPlugin({
  sourceMap: true
})
```

```javascript
// In webpack 2.x,
// extensions can not push empty string ('')
resolve.extensions: ['.js', '.jsx', '.vue']
```

A webpack-dev-server undocument api, to reduce a lot of useless information

```javascript
// webpack-dev-server node api
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
```

For more configuration infos, to see:

* [How to Upgrade from Webpack 1?](https://webpack.js.org/how-to/upgrade-from-webpack-1/)
