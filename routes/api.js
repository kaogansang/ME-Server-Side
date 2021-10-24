//导入token模块
const jwt = require('jsonwebtoken')
//导入express
const express = require('express');
const app = express();
//导入接受post请求数据的模块
const bodyParser = require('body-parser')
//导入主路由
const main = require('./router/main');
//导入数据库
require('./database/init');
//导入数据库模型
require('./database/model/User');

//拦截所有get请求
app.get('/', (req, res) => {
  res.status(404).send({
    data: null,
    meta: {
      msg: 'Not Found',
      status: 404
    }
  });
});
//拦截/api下的所有请求 验证 token
app.use('/api', (req, res, next) => {
  //判断目的url是否是登录或者注册，若是则放行
  if (req.url == '/register' || req.url == '/login') {
    next();
    return;
  };
  //接受客户端传来的token
  const token = String(req.headers.authorization);
  //解析 token
  const username = jwt.decode(token, 'huyi');
  //判断客户端是否传递了token
  if(token == 'undefined' || username == null) {
    res.status(401).send({
      data: null,
      meta: {
        msg: "token无效",
        status: 401,
        username
      }
    });
    return;
  };
  //验证通过放行
  next();
});


app.use(bodyParser.urlencoded({ extended: false }));
//为main匹配地址 /api
app.use('/api', main);
//错误访问返回404
app.use((req,res)=>{
  res.status(404).send({
    data: null,
    meta: {
      msg: '404 Not Found',
      status: '404'
    }
  })
})