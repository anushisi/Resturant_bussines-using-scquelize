// sequelize.js

const { Sequelize } = require('sequelize');

// Replace 'your_username', 'your_password', 'your_database' with your MySQL credentials
const sequelize = new Sequelize('food_bussiness', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql', // Specify the dialect for MySQL
});

module.exports = sequelize;



