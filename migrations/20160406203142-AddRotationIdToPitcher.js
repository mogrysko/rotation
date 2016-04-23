'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Pitchers', 'rotation_id', Sequelize.INTEGER);
  }
};
