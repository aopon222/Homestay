'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pembayaran.belongsTo(models.Reservasi, { foreignKey: 'id_reservasi' });
    }
  }
  Pembayaran.init({
    id_reservasi: DataTypes.INTEGER,
    tipe: DataTypes.STRING,
    jumlah: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Pembayaran',
  });
  return Pembayaran;
};