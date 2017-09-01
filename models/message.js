'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    body: DataTypes.STRING(140),
    userId: DataTypes.INTEGER,
  }, {});

  Message.associate = (function(models){
    Message.hasMany(models.Like,{ as: 'Likes', foreignKey: 'messageId',})
    Message.belongsTo(models.User,{  as: 'Users',foreignKey: 'userId',})
  })
  return Message;
};
