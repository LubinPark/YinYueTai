const AV     = require('leancloud-storage')
const appId  = 'eGmV4HE4ec4as9E2xocTQKzx-gzGzoHsz'
const appKey = 'X5LBv2vmbb6zxl5NiiTFadHf'
const region = 'cn'

// const appIdTest  = 'YYnxlFRFdsK4IGBlXTp8vped-MdYXbMMI'
// const appKeyTest = 'o8Pxc27kDn0TeVljNo16jcpI'
// const regionTest = 'us'
// AV.init({ appIdTest, appKeyTest, regionTest })

AV.init({ appId, appKey, region })

module.exports = AV
