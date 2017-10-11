const AV = require('leancloud-storage')

const appId  = `YYnxlFRFdsK4IGBlXTp8vped-MdYXbMMI`
const appKey = `o8Pxc27kDn0TeVljNo16jcpI`
const region = `cn`
AV.init({ appId, appKey, region })

module.exports = AV
