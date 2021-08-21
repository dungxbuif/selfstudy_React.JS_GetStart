'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class doctor_info extends Model {
      static associate(models) {
         // doctor_info.belongsTo(models.Allcodes, {
         //    foreignKey: 'positionId',
         //    targetKey: 'keyMap',
         //    as: 'positionData',
         // });
         // doctor_info.belongsTo(models.Allcodes, {
         //    foreignKey: 'gender',
         //    targetKey: 'keyMap',
         //    as: 'genderData',
         // });
         // doctor_info.hasOne(models.Markdown, {
         //    foreignKey: 'doctorId',
         //    as: 'markDownData',
         // });
      }
   }
   doctor_info.init(
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
         modelName: 'doctor_info',
      },
   );
   return doctor_info;
};
