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

module.exports = HomeRequest
