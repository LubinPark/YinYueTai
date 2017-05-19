UserRequest.searchUsers = (callback) => {
  AV.Cloud.rpc('searchUsers').then((users)=> {
    callback(users, null)
  }, (err) => {
    callback(null, err)
  })
}

module.exports = UserRequest
