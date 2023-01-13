'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('conversations', 'lastMessageId', {
      type: Sequelize.UUID,
      foreignKey: true,
      references: {
        model: {
          tableName: 'messages',
        },
        key: '_id',
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('conversations', 'lastMessageId')
  }
};
