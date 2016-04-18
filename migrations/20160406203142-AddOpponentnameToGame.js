'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Games', 'opponentname', Sequelize.STRING);
  }
};
