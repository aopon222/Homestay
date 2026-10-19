'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Laporans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.DATE
      },
      periode: {
        type: Sequelize.STRING
      },
      sumber_booking: {
        type: Sequelize.STRING
      },
      total_pendapatan: {
        type: Sequelize.DECIMAL
      },
      jumlah_reservasi: {
        type: Sequelize.INTEGER
      },
      jumlah_kamar_terisi: {
        type: Sequelize.INTEGER
      },
      dibuat_pada: {
        type: Sequelize.DATE
      },
      dibuat_oleh: {
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
    await queryInterface.dropTable('Laporans');
  }
};