const fs = require('fs-extra')
const path = require('path')
const cwd = process.cwd()

// __dirname js 文件路径
// process.cwd() node 运行的路径
// path.resolve('node_modules') node 运行时路径 + node_modules
const src = path.resolve('src')

const urls = {
  /* base urls */
  project: cwd,
  src: src,
  build: path.resolve('build'),
  docs: path.resolve('docs'),
  node_modules: path.resolve('node_modules'),
  webpack: path.resolve('tools/webpack'),
  temp: path.resolve('tools/.temp'),
  /* resource urls */
  assets: path.resolve(src, 'assets'),
  components: path.resolve(src, 'components'),
  pages: path.resolve(src, 'pages'),
  favicon: path.resolve(src, 'assets/favicon.ico'),
  bootstrap: path.resolve(src, 'components/bootstrap'),
  helpers: path.resolve(src, 'handlebars/helpers'),
  templates: path.resolve(src, 'handlebars/templates')
}

fs.ensureDirSync(urls.temp) // Create .temp dir

module.exports = urls
