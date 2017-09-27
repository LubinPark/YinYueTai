import AV from '../actions/AV'

let UserRequest = {}

UserRequest.searchUsersByIds = (ids, callback) => {
  var query = new AV.Query('_User')
  query.containedIn('objectId', ids)
  query.find().then((users) => {
    callback(users, null)
  }).catch((err) => {
    callback(null, err)
  })
}

//在服务器写的‘searchUsers’
UserRequest.searchUsers = (callback) => {
  AV.Cloud.rpc('searchUsers').then((users)=> {
    callback(users, null)
  }, (err) => {
    callback(null, err)
  })
}

UserRequest.currentUser = (callback) => {
  AV.User.currentAsync().then((currentUser) => {
    callback(currentUser, null)
  }).catch((err) => {
    callback(null, err)
  })
}

module.exports = UserRequest
