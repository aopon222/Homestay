'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Reservasi, { foreignKey: 'id_user' });
      User.hasMany(models.CheckinOut, { foreignKey: 'dicatat_oleh' });
      User.hasMany(models.Laporan, { foreignKey: 'dibuat_oleh' });
    }
  }
  User.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};