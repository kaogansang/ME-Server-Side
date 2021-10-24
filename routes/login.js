const express = require('express');
var router = express.Router();
var models = require('../models');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const findUser = await models.users.findOne({
    where: { username }
  });
  console.log(findUser);
  //判断账号是否存在
  if (!findUser) {
    res.status(400).send({
      data: null,
      meta: {
        msg: "账号不存在"
      }
    });
    return;
  }
  //判断账号密码是否正确
  if (username != findUser.username || password != findUser.password) {
    res.status(400).send({
      data: null,
      meta: {
        msg: "账号或者密码不正确"
      }
    });
    return;
  }
  //登录成功
  //生成token返回客户端
  //第一个参数是 组 ，第二个是 私钥（自己随便定义）
  const token = jwt.sign({ username }, 'huyi',{
    //定义token的一些信息
    // algorithm：加密算法（默认值：HS256）
    // expiresIn：以秒表示或描述时间跨度zeit / ms的字符串。如60，"2 days"，"10h"，"7d"，Expiration time，过期时间
    // notBefore：以秒表示或描述时间跨度zeit / ms的字符串。如：60，"2days"，"10h"，"7d"
    // audience：Audience，观众
    // issuer：Issuer，发行者
    // jwtid：JWT ID
    // subject：Subject，主题
    // noTimestamp
    // header 
  })
  res.status(200).send({
    data: {
      userId:findUser.id,
      username,
      token
    },
    meta: {
      msg: "登录成功"
    }
  })
})

module.exports = router;