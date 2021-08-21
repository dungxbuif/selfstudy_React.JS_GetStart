'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Schedule extends Model {
      static associate(models) {
         Schedule.belongsTo(models.Allcodes, {
            foreignKey: 'timeType',
            targetKey: 'keyMap',
            as: 'scheduleData',
         });
      }
   }
   Schedule.init(
      {
         currentNumber: DataTypes.INTEGER,
         maxNumber: DataTypes.INTEGER,
         date: DataTypes.DATE,
         timeType: DataTypes.STRING,
         doctorId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Schedule',
      },
   );
   return Schedule;
};
