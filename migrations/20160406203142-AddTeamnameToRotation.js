'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Rotations', 'teamname', Sequelize.STRING);
  }
};
