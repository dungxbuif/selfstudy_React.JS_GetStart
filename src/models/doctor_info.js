'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class doctor_infos extends Model {
      static associate(models) {
         doctor_infos.belongsTo(models.User, {
            foreignKey: 'doctorId',
            as: 'doctorInfoData',
         });
         doctor_infos.belongsTo(models.Allcodes, {
            foreignKey: 'priceId',
            targetKey: 'keyMap',
            as: 'priceData',
         });
         doctor_infos.belongsTo(models.Allcodes, {
            foreignKey: 'paymentId',
            targetKey: 'keyMap',
            as: 'paymentData',
         });
         doctor_infos.belongsTo(models.Allcodes, {
            foreignKey: 'provinceId',
            targetKey: 'keyMap',
            as: 'provinceData',
         });
      }
   }
   doctor_infos.init(
      {
         doctorId: DataTypes.INTEGER,
         priceId: DataTypes.STRING,
         provinceId: DataTypes.STRING,
         paymentId: DataTypes.STRING,
         addressClinic: DataTypes.STRING,
         nameClinic: DataTypes.STRING,
         note: DataTypes.STRING,
         count: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'doctor_infos',
      },
   );
   return doctor_infos;
};
