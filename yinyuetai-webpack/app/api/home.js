import AV from '../containers/AVConfig'

var HomeRequest = {}

HomeRequest.getHomePage = (callback) => {
  AV.Cloud.rpc(`getHomePage`).then((home) => {
    callback(home, null)
  }, (err) => {
    callback(null, err)
  })
}

module.exports = HomeRequest
