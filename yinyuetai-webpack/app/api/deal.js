import AV from '../containers/AVConfig'

var DealRequest = {}
var Deal = AV.Object.extend('deal')

//请求deals
DealRequest.getDeals = (params, callback) => {
  console.log(params);
  AV.Cloud.rpc(`getDeals`, params).then((deals) => {
    callback(deals, null)
  },(err) => {
    callback(null ,err)
  })
}

// 根据deal的id请求deal，不用登录
DealRequest.getDealById = (params, callback) => {
  let query = new AV.Query(Deal)
  query
  .equalTo('objectId', params.dealId)
  .include(['user', 'products'])
  .equalTo('deleted', false)
  // .greaterThanOrEqualTo('validDate', new Date())
  .find().then((deal) => {
    callback(deal[0], null)
  }).catch((err) => {
    callback(null, err)
  })
}

// 根据deal的id请求deal，包括是否收藏，登录下才可用
DealRequest.getDealWithFav = (params, callback) => {
  AV.Cloud.rpc('getDealWithFav', params).then((deal) => {
    callback(deal, null)
  },(err) => {
    callback(null, err)
  })
}

//  根据用户，请求用户发布的deals，可以包括 limit skip 参数
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
