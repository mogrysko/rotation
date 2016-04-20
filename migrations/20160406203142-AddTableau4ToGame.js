'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Games', 'tableau4', Sequelize.STRING);
  }
};
