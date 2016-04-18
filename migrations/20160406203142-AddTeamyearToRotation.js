'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Rotations', 'teamyear', Sequelize.STRING);
  }
};
