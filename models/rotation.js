'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var Rotation = sequelize.define('Rotation', {
    team: DataTypes.STRING,
    teamcity: DataTypes.STRING,
    teamname: DataTypes.STRING,
    teamyear: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Rotation.belongsTo(models.User, { foreignKey: 'user_id' });
        Rotation.hasMany(models.Pitcher, { foreignKey: 'rotation_id' });
      }
    },
  });
  return Rotation;
};
