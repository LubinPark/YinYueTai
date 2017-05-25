import AV from '../../AVConfig'

var DealRequest = {}

DealRequest.getDeals = (callback) => {
  let params = {location: '悉尼'}
  AV.Cloud.rpc('getDeals', params).then((deals) => {
    callback(deals, null)
  },(err) => {
    callback(null ,err)
  })
}

module.exports = DealRequest;
