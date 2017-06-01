import AV from '../containers/AVConfig'

var DealRequest = {}

DealRequest.getDeals = (callback) => {
  let params = {location: '悉尼'}
  AV.Cloud.rpc('getDeals', params).then((deals) => {
    callback(deals, null)
  },(err) => {
    callback(null ,err)
  })
}

DealRequest.getDealById = (params, callback) => {
  AV.Cloud.rpc('getDeals', params).then((deal) => {
    console.log(deal);
    callback(deal, null)
  },(err) => {
    console.log(err);
    callback(null ,err)
  })
}

module.exports = DealRequest;
