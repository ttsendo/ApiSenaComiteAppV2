// src/models/ProgramasModels.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Programa = db.define('programas', {
  id_programa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_programa: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  nivel_formacion: {
    type: DataTypes.ENUM(
      'Tecnico',
      'Tecnologo',
      'Especializacion Tecnologica',
      'Operario'
    ),
    allowNull: false
  },
  version_programa: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  estado_programa: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    allowNull: false,
    defaultValue: 'activo'
  }
}, {
  tableName: 'programas',
  timestamps: true,              // createdAt, updatedAt
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Relaciones
// Programa.hasMany(require('./FichasModels'), { foreignKey: 'id_programa' });
// Programa.hasMany(require('./CompetenciasProgramasModels'), { foreignKey: 'id_programa' });

module.exports = Programa;
