import AV from '../containers/AVConfig'

var HomeRequest = {}

HomeRequest.getHomePage = (callback) => {
  AV.Cloud.rpc(`getHomePage`).then((home) => {
    callback(home, null)
  }, (err) => {
    callback(null, err)
  })
}

HomeRequest.getHotSearches = (callback) => {
  var query = new AV.Query('hotSearch');
  return query.find().then((searches) =>{
    callback(searches, null);
  }).catch((err)=>{
    callback(null, err);
  });
}

HomeRequest.getLocations = (callback) => {
  AV.Cloud.rpc(`getLocations`).then((locations) => {
    callback(locations, null)
  }, (err) => {
    callback(null, err)
  })
}

HomeRequest.getDefaultFilters = (callback) => {
  AV.Cloud.rpc(`getDefaultFilters`).then((filters) => {
    callback(filters, null)
  }, (err) => {
    callback(null, err)
  })
}

module.exports = HomeRequest
