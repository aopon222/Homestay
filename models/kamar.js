'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kamar.hasMany(models.Reservasi, { foreignKey: 'id_kamar' });
    }
  }
  Kamar.init({
    nomor_kamar: DataTypes.STRING,
    tipe_kamar: DataTypes.STRING,
    harga_per_malam: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    keterangan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Kamar',
  });
  return Kamar;
};