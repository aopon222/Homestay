'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CheckinOuts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_reservasi: {
        type: Sequelize.INTEGER,
        references: { model: 'Reservasis', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      waktu_checkin: {
        type: Sequelize.DATE
      },
      waktu_checkout: {
        type: Sequelize.DATE
      },
      catatan: {
        type: Sequelize.TEXT
      },
      dicatat_oleh: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CheckinOuts');
  }
};