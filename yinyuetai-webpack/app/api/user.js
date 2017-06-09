var AV = require('../containers/AVConfig')

var UserRequest ={}

//根据用户id 请求用户
UserRequest.getUser = (params, callback) => {
  AV.Cloud.rpc(`getUser`, params).then((user) => {
    callback(user, null)
  }, (err) => {
    callback(null, err)
  })
}

module.exports = UserRequest
