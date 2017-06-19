import AV from '../containers/AVConfig'

var HomeRequest = {}

//获取主页信息
HomeRequest.getHomePage = (callback) => {
  AV.Cloud.rpc(`getHomePage`).then((home) => {
    callback(home, null)
  }, (err) => {
    callback(null, err)
  })
}

//获取热门搜索
HomeRequest.getHotSearches = (callback) => {
  var query = new AV.Query('hotSearch');
  return query.find().then((searches) =>{
    callback(searches, null);
  }).catch((err)=>{
    callback(null, err);
  })
}

//获取筛选地区的数据
HomeRequest.getLocations = (callback) => {
  AV.Cloud.rpc(`getLocations`).then((locations) => {
    callback(locations, null)
  }, (err) => {
    callback(null, err)
  })
}

//获取基本筛选
HomeRequest.getDefaultFilters = (callback) => {
  AV.Cloud.rpc(`getDefaultFilters`).then((filters) => {
    callback(filters, null)
  }, (err) => {
    callback(null, err)
  })
}

module.exports = HomeRequest
