'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {

    static associate(models) {
      
    }
  };
  Clinic.init({
    addess: DataTypes.STRING,
    decription: DataTypes.TEXT,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};