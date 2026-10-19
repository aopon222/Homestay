'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CheckinOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CheckinOut.belongsTo(models.Reservasi, { foreignKey: 'id_reservasi' });
      CheckinOut.belongsTo(models.User, { foreignKey: 'dicatat_oleh', as: 'Pencatat' });
    }
  }
  CheckinOut.init({
    id_reservasi: DataTypes.INTEGER,
    waktu_checkin: DataTypes.DATE,
    waktu_checkout: DataTypes.DATE,
    catatan: DataTypes.TEXT,
    dicatat_oleh: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CheckinOut',
  });
  return CheckinOut;
};