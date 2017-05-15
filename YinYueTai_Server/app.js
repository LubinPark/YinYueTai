'use strict';
var express = require('express');
var AV = require('leanengine');
var path = require('path');
var timeout = require('connect-timeout');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./index');

//创建一个 Express 应用。express() 是一个由 express 模块导出的入口（top-level）函数。
var app = express();

// 加载云引擎中间件
app.use(AV.express());

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
例子用法 express.static(root, [options])
express.static 是 Express 内置的唯一一个中间件。是基于 serve-static 开发的，负责托管 Express 应用内的静态资源。
root 参数指的是静态资源文件所在的根目
options 对象是可选的，支持以下属性：

属性---	描述---	类型---	默认值
dotfiles---  Option for serving dotfiles. Possible values are “allow”, “deny”, and “ignore”---	String---	“ignore”
etag---	Enable or disable etag generation---	Boolean---	true
extensions---	Sets file extension fallbacks.---	Boolean---	false
index---	Sends directory index file. Set false to disable directory indexing.---	Mixed---	“index.html”
lastModified---	Set the Last-Modified header to the last modified date of the file on the OS. Possible values are true or false.---	Boolean---	true
maxAge---	Set the max-age property of the Cache-Control header in milliseconds or a string in ms format---	Number---	0
redirect---	Redirect to trailing “/” when the pathname is a directory.---	Boolean---	true
setHeaders---	Function for setting HTTP headers to serve with the file.---	Function---
*/
app.use(express.static('public'));

// 设置默认超时时间
app.use(timeout('15s'));

//Expree的反向代理
//通过启用“信任代理”设置app.enable(“trust proxy”),Express有一些反向代理的技巧，X-Forwarded - *头字段可能是可信的
app.enable('trust proxy');

// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());

//json数据解析
app.use(bodyParser.json());

//bodyParser.urlencoded 模块用于解析req.body的数据，解析成功后覆盖原来的req.body，如果解析失败则为 {}
app.use(bodyParser.urlencoded({ extended: false }));

//加载缓存的插件
app.use(cookieParser());

//初始请求
app.get('/', function(req, res) {
  res.render('index');
});

// 可以将一类的路由单独保存在一个文件中
app.use('/', require('./routes/router'));

app.use(function(req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handlers， 错误处理
app.use(function(err, req, res, next) {

  console.log(err);
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  if (req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {}
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.render('error', {
    message: err.message,
    error: error
  });
});

module.exports = app;
