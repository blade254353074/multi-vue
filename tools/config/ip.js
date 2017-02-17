const os = require('os')
const interfaces = os.networkInterfaces()

module.exports = Object.keys(interfaces)
  .reduce((arr, key) => arr.concat(interfaces[key]), [])
  .filter(item => item.family === 'IPv4' && item.internal === false)
  .reduce((local, item) => item && item.address || local, 'localhost')
