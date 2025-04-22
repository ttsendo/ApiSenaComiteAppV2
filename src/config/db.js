// src/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.BD_NOMBRE,
  process.env.BD_USER,
  process.env.BD_PASS,
  {
    host: process.env.BD_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // desactiva logs de SQL en consola
  }
);

module.exports = sequelize;
