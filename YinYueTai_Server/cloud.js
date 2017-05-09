var AV = require('leanengine');

AV.init({
  appId: 'eGmV4HE4ec4as9E2xocTQKzx-gzGzoHsz',
  appKey: 'X5LBv2vmbb6zxl5NiiTFadHf',
  masterKey: 'CyawLy3GXgMO4Qa7QlBF4PdV'
});

AV.Cloud.useMasterKey();

AV.Cloud.define('searchUsers', function(request) {
  var query = new AV.Query('_User');
  return query.find().then((users) =>{
    return users;
  }).catch((err)=>{
    return AV.Cloud.Error('查询失败(searchUsers)');
  });
});
