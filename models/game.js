'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    date: DataTypes.DATE,
    opponent: DataTypes.STRING,
    tableau: {
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
