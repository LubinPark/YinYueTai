import AV from '../containers/AVConfig'

var DealRequest = {}
var Deal = AV.Object.extend('deal')

DealRequest.getDeals = (callback) => {
  let params = { limit: 100 }
  AV.Cloud.rpc(`getDeals`, params).then((deals) => {
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

DealRequest.getDealsByUser = (user, params, callback) => {

  let skip = params.skip ? params.skip : 0
  let limit = params.limit ? params.limit : 10
  let query = new AV.Query(Deal)

  query
  .equalTo('deleted', false)
  .equalTo('user', user)
  .greaterThanOrEqualTo('validDate', new Date())
  .descending('editedAt')
  .limit(limit)
  .skip(skip)
  .include(['user', 'products'])
  .find().then((deals) => {
    callback(deals, null)
  }).catch((err) => {
    callback(null, err)
  })
}

module.exports = DealRequest
