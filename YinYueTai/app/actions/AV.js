const AV     = require('leancloud-storage')
const appId  = 'eGmV4HE4ec4as9E2xocTQKzx-gzGzoHsz'
const appKey = 'X5LBv2vmbb6zxl5NiiTFadHf'
const region = 'cn'

AV.init({ appId, appKey, region })

module.exports = AV
