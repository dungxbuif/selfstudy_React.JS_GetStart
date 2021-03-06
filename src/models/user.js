'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      static associate(models) {
         User.belongsTo(models.Allcodes, {
            foreignKey: 'positionId',
            targetKey: 'keyMap',
            as: 'positionData',
         });
         User.belongsTo(models.Allcodes, {
            foreignKey: 'gender',
            targetKey: 'keyMap',
            as: 'genderData',
         });
         User.hasOne(models.Markdown, {
            foreignKey: 'doctorId',
            as: 'markDownData',
         });
         User.hasOne(models.doctor_infos, {
            foreignKey: 'doctorId',
            as: 'doctorInfoData',
         });
      }
   }
   User.init(
      {
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         firstName: DataTypes.STRING,
         lastName: DataTypes.STRING,
         address: DataTypes.STRING,
         phonenumber: DataTypes.STRING,
         gender: DataTypes.STRING,
         image: DataTypes.STRING,
         roleId: DataTypes.STRING,
         positionId: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'User',
      },
   );
   return User;
};
