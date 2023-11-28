// // models/user.js
// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("../db/dbconfig.js");

// const User = sequelize.define(
//   'restraunt',
//   {
//     id:{
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     imageurl: {
//       type: DataTypes.STRING,
//       // You can add other validations or configurations here
//     },
//     address: {
//       type: DataTypes.STRING,
//       // You can add other validations or configurations here
//     },
//     contactNumber: {
//       type: DataTypes.STRING,
//       // You can add other validations or configurations here
//     },
//   },
//   {tableName: 'restraunts'}

// );
// module.exports = User;


// models/Restaurant.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbconfig');

const Restaurant = sequelize.define('Restaurant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Restaurant;

