'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Games', 'tableau2', Sequelize.STRING);
  }
};
