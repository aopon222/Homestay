'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Laporan.belongsTo(models.User, { foreignKey: 'dibuat_oleh', as: 'Pembuat' });
    }
  }
  Laporan.init({
    tanggal: DataTypes.DATE,
    periode: DataTypes.STRING,
    sumber_booking: DataTypes.STRING,
    total_pendapatan: DataTypes.DECIMAL,
    jumlah_reservasi: DataTypes.INTEGER,
    jumlah_kamar_terisi: DataTypes.INTEGER,
    dibuat_pada: DataTypes.DATE,
    dibuat_oleh: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Laporan',
  });
  return Laporan;
};