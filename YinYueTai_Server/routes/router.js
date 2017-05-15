var router = require('express').Router();

router.get('/home', function(req, res) {
  res.render('home', {
      title: 'home 列表',
    });
});

router.use('/wechat', require('./wechatBot'));

module.exports = router
