const jwt = require('jsonwebtoken');
const express = require('express');
var router = express.Router();
var models = require('../models');


router.use('/', (req, res, next) => {
  const token = String(req.headers.authorization);
  jwt.verify(token, "huyi", (err, decoded) => {
    if (err) {
      res.status(401).send({
        data: null,
        meta: {
          msg: "token无效",
          status: 401
        }
      })
    } else {
      console.log(decoded);
      next();
    }
  })
})
module.exports = router;