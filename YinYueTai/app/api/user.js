import AV from '../actions/AV'

var UserRequest = {}

UserRequest.searchUsersByIds= (ids, callback) => {
  var query = new AV.Query('_User')
  query.containedIn('objectId', ids)
  query.find().then((users) => {
    callback(users, null)
  }).catch((err) => {
    console.log(err);
    callback(null, err)
  })
}

module.exports = UserRequest
