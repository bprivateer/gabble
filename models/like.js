'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER
  }, {});

  Like.associate = (function(models){
    Like.belongsTo(models.User,{as: 'User',foreignKey: 'userId',})
    Like.belongsTo(models.Message,{as: 'Message',foreignKey: 'messageId'})
  })

  return Like;
};
