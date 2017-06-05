var AV = require('../containers/AVConfig')

var UserRequest ={}

UserRequest.searchUsers = (callback) => {
  AV.Cloud.rpc(`searchUsers`).then((users) => {
    callback(users, null)
  }, (err) => {
    callback(null, err)
  })
}

UserRequest.getHomePage = (callback) => {
  AV.Cloud.rpc(`getHomePage`).then((home) => {
    callback(home, null)
  }, (err) => {
    callback(null, home)
  })
}

module.exports = UserRequest
