'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Rotations', 'user_id', Sequelize.INTEGER);
  }
};
