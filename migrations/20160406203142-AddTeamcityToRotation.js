'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Rotations', 'teamcity', Sequelize.STRING);
    return queryInterface.addColumn('Rotations', 'teamname', Sequelize.STRING);
    return queryInterface.addColumn('Rotations', 'teamyear', Sequelize.STRING);
  }
};
