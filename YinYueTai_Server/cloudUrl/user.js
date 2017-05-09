var AV = require('leanengine');

AV.Cloud.define('searchUsers', function(request) {
  var query = new AV.Query('_User');
  return query.find().then((users) =>{
    return users;
  }).catch((err)=>{
    return AV.Cloud.Error('查询失败(searchUsers)');
  });
});
