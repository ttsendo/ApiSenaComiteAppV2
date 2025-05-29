// src/controllers/UsuariosController.js
const Usuario = require('../models/UsuariosModels');
const Rol = require('../models/RolesModels');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// Obtener todos los usuarios activos
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: { estado: 'activo' },
      include: [{ model: Rol }]
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [{ model: Rol }]
    });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error });
  }
};

// Crear usuario
exports.crearUsuario = async (req, res) => {
  try {
    const {
      id_rol, nombre_completo, correo_personal, correo_sena, tipo_documento,
      numero_documento, telefono, direccion, pais_residencia, departamento_residencia,
      municipio_residencia, contrasena
    } = req.body;

    // Validación de duplicados
    const existente = await Usuario.findOne({
      where: {
        [Op.or]: [
          { correo_sena },
          { correo_personal },
          { numero_documento }
        ]
      }
    });
    if (existente) return res.status(400).json({ mensaje: 'Ya existe un usuario con los mismos datos (correo o documento)' });

    const hash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await Usuario.create({
      id_rol,
      nombre_completo,
      correo_personal,
      correo_sena,
      tipo_documento,
      numero_documento,
      telefono,
      direccion,
      pais_residencia,
      departamento_residencia,
      municipio_residencia,
      contrasena: hash
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('❌ Error al crear usuario:', error); 
    res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message }); 
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    await usuario.update(req.body);
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
};
