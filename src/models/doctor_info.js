'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class doctor_infos extends Model {
      static associate(models) {
         doctor_infos.belongsTo(models.User, {
            foreignKey: 'doctorId',
            as: 'doctorInfoData',
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
