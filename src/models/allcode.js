'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Allcodes extends Model {
      static associate(models) {
         Allcodes.hasMany(models.User, {
            foreignKey: 'positionId',
            as: 'positionData',
         });

         Allcodes.hasMany(models.User, {
            foreignKey: 'gender',
            as: 'genderData',
         });

         Allcodes.hasMany(models.Schedule, {
            foreignKey: 'timeType',
            as: 'scheduleData',
         });
         Allcodes.hasMany(models.doctor_infos, {
            foreignKey: 'priceId',
            as: 'priceData',
         });

         Allcodes.hasMany(models.doctor_infos, {
            foreignKey: 'paymentId',
            as: 'paymentData',
         });

         Allcodes.hasMany(models.doctor_infos, {
            foreignKey: 'provinceId',
            as: 'provinceData',
         });
      }
   }
   Allcodes.init(
      {
         keyMap: DataTypes.STRING,
         type: DataTypes.STRING,
         valueEn: DataTypes.STRING,
         valueVi: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Allcodes',
      },
   );
   return Allcodes;
};
