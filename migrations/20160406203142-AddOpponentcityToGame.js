'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Games', 'opponentcity', Sequelize.STRING);
  }
};
