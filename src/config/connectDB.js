const { Sequelize } = require('sequelize');
const chalk = require('chalk');

const successAlert = chalk.bold.cyan;
const errorWaring = chalk.bold.red;

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('hoidanit', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(successAlert('Connection has been established successfully.'));
  } catch (error) {
    console.error(errorWaring(`Unable to connect to the database: ${error}`));
  }
}

module.exports = connectDB();