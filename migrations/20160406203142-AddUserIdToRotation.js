'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Rotation', 'user_id', Sequelize.INTEGER);
  }
};
