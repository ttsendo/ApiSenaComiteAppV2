// src/models/CompetenciasProgramasModels.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Programa = require('./ProgramasModels');

const CompetenciaPrograma = db.define('competencias_programas', {
  id_competencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_programa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre_competencia: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  numero_horas_competencia: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'competencias_programas',
  timestamps: true,              // utiliza createdAt y updatedAt
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Relaciones
CompetenciaPrograma.belongsTo(Programa, { foreignKey: 'id_programa' });
Programa.hasMany(CompetenciaPrograma, { foreignKey: 'id_programa' });

module.exports = CompetenciaPrograma;
