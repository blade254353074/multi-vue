const path = require('path')
const glob = require('glob')
const urls = require('../urls')
const fileExist = require('./fileExist')
const NODE_ENV = process.env.NODE_ENV
const templateExt = ['html', 'hbs', 'ejs']

function constructEntries (templateFiles) {
  const pagesAttr = []
  templateFiles.map(template => {
    const dir = path.dirname(template)
    // key `dir/subpage1` or `poage1`
    const key = path.dirname(path.relative(urls.pages, template))
    const templateKey = `[template]${encodeURIComponent(key)}` // 让 template 模板可追踪
    const jsPath = path.resolve(dir, 'main.js')
    const page = {
      key,
      templateKey,
      template
    }

    if (fileExist(jsPath)) {
      page.js = jsPath || './' + path.relative(urls.project, jsPath)
    }

    /*
      page {
        key: 'dir/subpage1',
        templateKey: '<template>-dir/subpage1',
        template: '/absolute/path/to/dir/subpage1/main.html',
        js: './src/pages/dir/subpage1/main.js' // optional
      }
    */
    pagesAttr.push(page)
  })

  return pagesAttr
}

function constructEntryObject (pagesAttr, type) {
  let entry = {}
  pagesAttr.map(page => {
    let entryPart = { [page.key]: [] }
    if (type = 'bind') {
      // 'dir/subpage1': [ jspath, htmlpath ]
      if (NODE_ENV !== 'production') {
        entryPart[page.key].push(page.template)
      }
      if (page.js) {
        entryPart[page.key].push(page.js)
      }
    } else {
      if (NODE_ENV !== 'production') {
        // 'dir/subpage1': jspath,
        // '<template>-dir/subpage1': htmlpath
        // 为了让每个页面都跟随源 html 进行热更新，入口要加入源文件路径
        entryPart[page.templateKey] = page.template
      }
      if (page.js) {
        entryPart[page.key] = page.js
      }
    }
    Object.assign(entry, entryPart)
  })

  // 过滤无入口的键
  for (let key in entry) {
    if (entry[key].length < 1) {
      delete entry[key]
    }
  }

  return entry
}

function constructHtmlPluginsConfigArray (pagesAttr) {
  return pagesAttr.map(page => {
    const dependencies = ['manifest', 'libs', 'vendor']
    let chunks
    let inject
    let config
    if (NODE_ENV !== 'production') {
      inject = true // 注入到头部避免样式震动
      chunks = ['[dev]', page.templateKey].concat(dependencies)
    } else { // 生产环境
      inject = true
      chunks = dependencies
    }
    config = {
      _key: page.key,
      _templateKey: page.templateKey,
      filename: `${page.key}.html`,
      template: page.template,
      chunksSortMode: 'dependency', // 防止 [dev] 被放到最后
      favicon: urls.favicon,
      chunks,
      inject
    }

    if (page.js) {
      config.chunks.push(page.key)
    }
    /*
      config {
        _key: 'dir/page',
        _templateKey: '<template>-dir/page',
        filename: 'dir/page.html',
        template: '/path/to/dir/page/main.html',
        favicon: '/path/to/favicon.ico'
        chunks: ['vendor', 'dir/page'],
        inject: true
      }
    */
    return config
  })
}

function getPagesConfig () {
  try {
    const templateFiles = glob.sync(`${urls.pages}/**/main.+(${templateExt.join('|')})`)
    const pagesAttr = constructEntries(templateFiles)
    const entry = constructEntryObject(pagesAttr, 'bind') // Object
    const htmls = constructHtmlPluginsConfigArray(pagesAttr) // Array

    return { entry, htmls }
  } catch (err) {
    console.log("\007") // Beep
    console.error(err)
  }
}

module.exports = getPagesConfig()
