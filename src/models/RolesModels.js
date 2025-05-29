// src/models/RolesModels.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Usuario = require('./UsuariosModels');

const Rol = db.define('roles', {
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_rol: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  descripcion_rol: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: false
});

// Relaciones
Rol.hasMany(Usuario, { foreignKey: 'id_rol' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

module.exports = Rol;
