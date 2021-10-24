//错误处理模块
var createError = require('http-errors');
//引入express框架
var express = require('express');
//导入路径模块
var path = require('path');
//解析cookie
var cookieParser = require('cookie-parser');
//express默认日志中间件
var logger = require('morgan');


// 引入路由
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var testRouter = require('./routes/test');
//引入token校验路由
var authenticationRouter = require('./routes/authentication');


// 创建express框架实例对象
var app = express();

// 模板引擎
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//日志中间件
app.use(logger('dev'));
//解析json格式的数据
app.use(express.json());
//解析URL-encoded格式的请求体数据
app.use(express.urlencoded({ extended: false }));
//解析cookie
app.use(cookieParser());
//解析静态资源
app.use(express.static(path.join(__dirname, 'public')));

// 处理请求的路由中间件
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/test',testRouter);
app.use('/', authenticationRouter);
app.use('/articles', articlesRouter);


// 捕获没有匹配到的路径，并返回错误信息及404状态码
app.use(function (req, res, next) {
  next(createError(404));
});
// 错误捕获
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
