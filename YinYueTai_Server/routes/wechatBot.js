var router = require('express').Router();
var wechat = require('wechat');
var config = require('../config');
var data = {
  token: config.token,
  appid: config.appId,
  encodingAESKey: config.encodingAESKey,
  checkSignature: false
};

router.use('/', wechat(data.token).text(function(message, req, res, next) {

  var keyArray = ['你好', '约吗'];
  var content = message.Content;
  var keyIndex = keyArray.indexOf(content);

  switch (keyIndex) {
    case 0:
      {
        res.reply({
          type: "text",
          content: '您好，大家好才是真的好！'
        });
      }
      break;
    case 1:
      {
        res.reply({
          type: "text",
          content: '不约，不约，叔叔我们不约！'
        });
      }
      break;
    default:
      if (content === '1') {
        res.reply([
          {
            title: '图文',
            Description: '一无所有',
            picUrl: 'http://img2.niutuku.com/desk/1208/1510/ntk-1510-24060.jpg',
            url: 'http://www.baidu.com'
          }
        ])
        break;
      } else {
        res.reply({
          type: "text",
          content: '...'
        });
        break;
      }
  }
}).image(function(message, req, res, next) {

}).voice(function(message, req, res, next) {

}).video(function(message, req, res, next) {

}).shortvideo(function(message, req, res, next) {

}).location(function(message, req, res, next) {

}).link(function(message, req, res, next) {

}).event(function(message, req, res, next) {
  if (message.Event === 'subscribe') {
    res.reply({
      type: "text",
      content: '欢迎订阅'
    });
  } else {
    if (message.EventKey === 'click_1') {
      res.reply({
        type: "text",
        content: '谢谢'
      });
    } else {
      res.reply({
        type: "text",
        content: ''
      });
    }
  }

}).device_text(function(message, req, res, next) {

}).device_event(function(message, req, res, next) {

}).middlewarify());

module.exports = router;
