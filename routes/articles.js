var express = require('express');
var router = express.Router();
var models = require('../models');
var Op = models.Sequelize.Op;//模糊查询

//查询文章列表
router.get('/', async function (req, res, next) {
  //定义页号和页大小
  let currentPage = parseInt(req.query.currentPage) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;


  //模糊查询
  let where = {};
  let title = req.query.title;
  if (title) {
    where.title = {
      [Op.like]: '%' + title + '%'
    };
  }

  //分页查询
  let result = await models.Article.findAndCountAll({
    //查询结果按id倒序
    // order: [['id', 'DESC']],
    //条件
    where: where,
    //页起始位置
    offset: (currentPage - 1) * pageSize,
    //页大小
    limit: pageSize
  });
  res.json({
    articles: result.rows,
    pagination: {
      currentPage,
      pageSize,
      //一共有多少条记录
      total: result.count
    }
  });
  //获取所有文章
  // let articles = await models.Article.findAll({
  //   //查询结果按id倒序
  //   order: [['id', 'DESC']],
  //   //条件
  //   where: where
  // });
  // res.json({ articles });
});

//根据条件查询请求
router.get('/query',async function (req, res, next) {
  // console.log(req.query)
  let articles = await models.Article.findAll({
    where: req.query,
    order: [['id', 'DESC']]
  });
  res.send(articles);
})

//新增
router.post('/', async (req, res, next) => {
  // res.json({'你发送的内容是': req.body})
  let article = await models.Article.create(req.body);
  res.json({ article });
})
//新增评论
router.post('/:id', async (req, res,next) => {
  let comment = await models.Comment.create(req.body);
  res.json({comment})
})

//查询单个文章
router.get('/:id', async (req, res, next) => {
  //按主键(Primary Key)查找findByPk(主键)
  let article = await models.Article.findOne({
    where: {id: req.params.id},
    //包含关联模型
    include: [
      {
        //评论
        model:models.Comment,
        include: {
          //评论作者信息
          model:models.users,
          attributes: ['username']
        }
      },
      {
        //文章作者信息
        model:models.users,
        attributes: ['username']
      },
    ],
  });
  res.json({ article });
})

//修改
router.put('/:id', async (req, res, next) => {
  let article = await models.Article.findByPk(req.params.id);
  article.update(req.body);
  res.json({ article });
})

//删除
router.delete('/:id', async (req, res, next) => {
  let article = await models.Article.findByPk(req.params.id);
  article.destroy();
  res.json({ msg: "删除成功" })
})

module.exports = router;
