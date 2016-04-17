'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Games', 'pitcher_id', Sequelize.INTEGER);
  }
};
