'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.hasMany(models.Article);
      models.users.hasMany(models.Comment);

      //创建自身的多对多连接
      models.users.belongsToMany(models.users, {
        as: 'follower',  //as:定义别名 ，随便取一个，在查找时需要
        foreignKey: 'followerId',  //定义外键，必须是关联表中的属性
        through: 'followTables',  //定义关联表的表名，（关联表需要额外创建）
      });
      models.users.belongsToMany(models.users, {
        as: 'star',
        foreignKey: 'starId',
        through: 'followTables',
      });
    }
  };
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};