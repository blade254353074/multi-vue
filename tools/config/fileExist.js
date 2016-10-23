const fs = require('fs')
/**
 * @param  {String} path to file/dir
 */
module.exports = function fileExist (path) {
  try {
    fs.accessSync(path, fs.constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}
