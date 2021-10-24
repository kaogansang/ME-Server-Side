const { query } = require('express');
var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET users listing. */
//获取用户信息
router.get('/:id', async function (req, res, next) {
  console.log(req.query.followerId)
  if (req.query.followerId) {
    let isFollow = await models.followTable.findOne({
      where: {
        followerId: req.query.followerId,
        starId: req.params.id
      }
    })
    var followState = isFollow ? true : false;
  }
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
      articleNum: user.Articles.length,
      followState: followState,
    }
    res.send(resData);
  } else {
    res.send('用户不存在！');
  }
});

//获取关注列表
router.get('/:id/starlist', async function (req, res, next) {
  let userId = req.params.id;
  let starlist = await models.users.findOne({
    where: { id: userId },
    attributes: ['username', 'id'],
    include: [
      {
        model: models.users,
        as: 'follower',
        attributes: ['id', 'username'],
        // 对关联的表进行查找
        // through: {
        //   where: { completed: true }
        // }
      },
    ]
  })
  res.send(starlist.follower);
})

//关注&取关
router.put('/', async function (req, res, next) {
  let { starId, followerId } = req.body;
  findOne = await models.followTable.findOne({
    where: { starId, followerId }
  })
  if (findOne) {
    findOne.destroy()
    res.json({ msg: "取关成功！", followState: false })
  } else {
    let followMsg = await models.followTable.create({
      starId,
      followerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    res.json({ msg: "关注成功！", followState: true });
  }
  // console.log(findOne)
  // await models.followtable.create({
  //   starId,
  //   followerId,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // })
})


module.exports = router;
