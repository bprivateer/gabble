'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});

  User.associate = (function(models){
    User.hasMany(models.Like,{ as: 'Likes', foreignKey: 'likeId',});
    User.hasMany(models.Message,{ as: 'Messages', foreignKey: 'messageId'});
  })
  return User;
};
