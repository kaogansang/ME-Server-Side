var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET users listing. */
//获取用户信息
router.get('/:id', async function (req, res, next) {
  let user = await models.users.findOne({
    where: { id: req.params.id },
    attributes: ['username', 'id'],
    include: [
      models.Article,
      models.Comment,
      {
        model: models.users,
        as: 'follower',
        // 对关联的表进行查找
        // through: {
        // attributes: ['id', 'username'],
        //   where: { completed: true }
        // }
      },
      {
        model: models.users,
        as: 'star'
      }
    ],
  });
  if (user) {
    let resData = {
      id: user.id,
      username: user.username,
      followerNum: user.follower.length,
      starNum: user.star.length,
      articleNum: user.Articles.length
    }
    res.send(resData);
  } else {
    res.send('用户不存在！');
  }
});

module.exports = router;
