var config = require('../config');
var WechatAPI = require('wechat-api');
var api = new WechatAPI(config.appId, config.appSecret);

var menu =
  {
   "button":[
    {
      "name":"菜单",
      'sub_button':[
      {
      "name": '网页',
      "type":"view",
      "url" :"http://www.baidu.com/"
      },
      {
      "name": '位置',
      "type": "location_select",
      "key" : "location_select_1"
      },
      {
      "name": '相册',
      "type": "pic_photo_or_album",
      "key" : "pic_photo_or_album_1"
      }]
    },

    {
      "name": "扫码",
      "sub_button": [
      {
        "type": "scancode_waitmsg",
        "name": "扫码带提示",
        "key": "rselfmenu_0_0",
      },
      {
        "type": "scancode_push",
        "name": "扫码推事件",
        "key": "rselfmenu_0_1",
      }]
    },

    {
      "name":"关于",
      "sub_button":[
      {
        "type":"click",
        "name":"赞一下我们",
        "key":"click_1"
      }]
    }
  ]
}

// 创建菜单 创建一次就够，一只存在
// api.createMenu(menu, (data) =>{
//  console.log(data)
// });

// 请求菜单
// api.getMenu = ((data) => {
  // console.log(data)
// });

// 删除菜单
// api.removeMenu((data) => {
// console.log(data)
// });
