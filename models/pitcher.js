'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var Pitcher = sequelize.define('Pitcher', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    number: DataTypes.STRING,
    playercity: DataTypes.STRING,
    playerteam: DataTypes.STRING,
    playeryear: DataTypes.STRING,
    picture: {
      type: DataTypes.STRING,
      isUrl: true,
    },
    profile: {
      type: DataTypes.STRING,
      isUrl: true,
    },
    seasonstats: {
      type: DataTypes.STRING,
      isUrl: true,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Pitcher.belongsTo(models.Rotation, { foreignKey: 'rotation_id' });
        Pitcher.hasMany(models.Game, { foreignKey: 'pitcher_id' });
      }
    },
  });
  return Pitcher;
};
