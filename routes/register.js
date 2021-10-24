const express = require('express');
let router = express.Router();
let models = require('../models');
const jwt = require('jsonwebtoken');

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  const hadUser = await models.users.findOne({
    where: { username }
  });
  if (password.length <= 6) {
    res.status(400).send({
      data: null,
      meta: {
        msg: "密码必须大于6位",
        status: 400
      }
    })
    return
  }
  if (hadUser) {
    res.status(400).send({
      data: null,
      meta: {
        msg: "用户名已经存在!",
        status: 400
      }
    })
    return
  }
  //创建用户
  console.log('用户名可用')
  const createUser = await models.users.create({ username, password });
  console.log('写入数据库')
  const token = jwt.sign({ username }, 'huyi');
  console.log(token);
  res.status(201).send({
    data: {
      //greateUser调用后会有返回值对象，返回创建的用户信息，如下
      /* 
        "createUser": {
            "id": 2,
            "username": "胡艺",
            "password": "555",
            "updatedAt": "2021-04-07T02:47:58.289Z",
            "createdAt": "2021-04-07T02:47:58.289Z"
        }      
      */
      createUser,
      token
    },
    meta: {
      msg: "创建成功!",
      status: 201
      //创建成功后可以在服务器下数据库中使用select * from users 查询
    }
  })
})
module.exports = router;
