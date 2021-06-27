'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    keyRole: DataTypes.STRING,
    typeRole: DataTypes.STRING,
    password: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};