import AV from '../containers/AVConfig'

var DealRequest = {}
var Deal = AV.Object.extend('deal')

DealRequest.getDeals = (callback) => {
  let params = {location: `悉尼`}
  AV.Cloud.rpc(`getDeals`).then((deals) => {
    callback(deals, null)
  },(err) => {
    callback(null ,err)
  })
}

DealRequest.getDealById = (params, callback) => {
  let query = new AV.Query(Deal)
  query
  .equalTo('objectId', params.id)
  .find().then((deal) => {
    callback(deal[0], null)
  }).catch((err) => {
    callback(null, err)
  })
}

module.exports = DealRequest
