'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Pitchers', 'seasonstats', Sequelize.STRING);
  }
};
