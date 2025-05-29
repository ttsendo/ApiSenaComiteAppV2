// src/models/BajasUsuariosModels.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Usuario = require('./UsuariosModels');

const BajaUsuario = db.define('bajas_usuarios', {
  id_baja: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_baja: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo_baja: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  fecha_reactivacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  motivo_reactivacion: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Relaciones
BajaUsuario.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Usuario.hasMany(BajaUsuario, { foreignKey: 'id_usuario' });

module.exports = BajaUsuario;
