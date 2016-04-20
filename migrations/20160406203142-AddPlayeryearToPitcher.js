'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Pitchers', 'playeryear', Sequelize.STRING);
  }
};
