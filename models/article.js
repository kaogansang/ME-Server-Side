'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * 用于定义关联的辅助方法。 
     * This method is not a part of Sequelize lifecycle.
     * 此方法不是Sequelize生命周期的一部分。 
     * The `models/index` file will call this method automatically.
     * 模型/索引文件将自动调用此方法。
     */
    static associate(models) {
      // define association here（在这里定义关联）
      //定义文章有很多的评论，将articles表与comments表关联起来
      models.Article.hasMany(models.Comment);
      models.Article.belongsTo(models.users);
    }
  };
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};