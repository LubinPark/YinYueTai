const AV = require('leancloud-storage')

// const appId  = `eGmV4HE4ec4as9E2xocTQKzx-gzGzoHsz`
// const appKey = `X5LBv2vmbb6zxl5NiiTFadHf`
// const region = `cn`
// AV.init({ appId, appKey, region })

// 美国站点(测试)
// const appId  = `YYnxlFRFdsK4IGBlXTp8vped-MdYXbMMI`
// const appKey = `o8Pxc27kDn0TeVljNo16jcpI`
// const region = `us`
// AV.init({ appId, appKey, region })

// 美国站点(正式)
const appId  = `f4kDY8MftXaCFQhevxM75jUG-MdYXbMMI`
const appKey = `6XT7r7i8o5EYPJU6n8H4gWhr`
const region = `us`
AV.init({ appId, appKey, region })

module.exports = AV
