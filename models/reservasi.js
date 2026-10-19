'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservasi.belongsTo(models.Tamu, { foreignKey: 'id_tamu' });
      Reservasi.belongsTo(models.Kamar, { foreignKey: 'id_kamar' });
      Reservasi.belongsTo(models.User, { foreignKey: 'id_user' });
      Reservasi.hasMany(models.Pembayaran, { foreignKey: 'id_reservasi' });
      Reservasi.hasOne(models.CheckinOut, { foreignKey: 'id_reservasi' });
    }
  }
  Reservasi.init({
    id_tamu: DataTypes.INTEGER,
    id_kamar: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    tanggal_masuk: DataTypes.DATE,
    tanggal_keluar: DataTypes.DATE,
    status_reservasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservasi',
  });
  return Reservasi;
};