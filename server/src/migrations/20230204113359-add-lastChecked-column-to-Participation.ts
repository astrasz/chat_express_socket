'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('participations', 'lastChecked', {
      type: Sequelize.DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('participations', 'lastChecked')
  }
};
