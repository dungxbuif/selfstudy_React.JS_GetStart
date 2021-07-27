'use strict';
const {Model} = require('sequelize');

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
