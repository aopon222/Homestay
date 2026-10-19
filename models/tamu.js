'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tamu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tamu.hasMany(models.Reservasi, { foreignKey: 'id_tamu' });
    }
  }
  Tamu.init({
    nama: DataTypes.STRING,
    no_hp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tamu',
  });
  return Tamu;
};