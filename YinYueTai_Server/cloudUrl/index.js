var AV = require('leanengine');

AV.Cloud.useMasterKey();

//调用user的url 请求文件
require('./user');
