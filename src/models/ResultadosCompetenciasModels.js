// src/models/ResultadosCompetenciasModels.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const CompetenciaPrograma = require('./CompetenciasProgramasModels');

const ResultadoCompetencia = db.define('resultados_competencias', {
  id_resultado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_competencia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre_resultado: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  tableName: 'resultados_competencias',
  timestamps: true,           // createdAt, updatedAt 
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Relaciones
ResultadoCompetencia.belongsTo(CompetenciaPrograma, { foreignKey: 'id_competencia' });
CompetenciaPrograma.hasMany(ResultadoCompetencia, { foreignKey: 'id_competencia' });

module.exports = ResultadoCompetencia;
