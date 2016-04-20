'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Games', 'tableau3', Sequelize.STRING);
  }
};
