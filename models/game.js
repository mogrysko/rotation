'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    date: DataTypes.DATE,
    opponent: DataTypes.STRING,
    opponentcity: DataTypes.STRING,
    opponentname: DataTypes.STRING,
    homeaway: DataTypes.STRING,
    tableau: {
      type: DataTypes.STRING,
      isUrl: true,
    },
    tableau2: {
      type: DataTypes.STRING,
      isUrl: true,
    },
    tableau3: {
      type: DataTypes.STRING,
      isUrl: true,
    },
    tableau4: {
      type: DataTypes.STRING,
      isUrl: true,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Game.belongsTo(models.Pitcher, { foreignKey: 'pitcher_id' });
      }
    },
  });
  return Game;
};
