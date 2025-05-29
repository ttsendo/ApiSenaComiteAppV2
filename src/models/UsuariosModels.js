// src/models/UsuariosModels.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Usuario = db.define('usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre_completo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo_personal: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  correo_sena: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  tipo_documento: {
    type: DataTypes.ENUM('CC', 'TI', 'CE', 'TE', 'PP', 'PEP'),
    allowNull: false
  },
  numero_documento: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  direccion: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  pais_residencia: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  departamento_residencia: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  municipio_residencia: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo',
    allowNull: false
  }
}, {
  timestamps: true, // activa createdAt y updatedAt
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Usuario;
