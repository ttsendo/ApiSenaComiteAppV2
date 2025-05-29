// src/controllers/BajasUsuariosController.js
const BajaUsuario = require('../models/BajasUsuariosModels');
const Usuario = require('../models/UsuariosModels');
const { Op } = require('sequelize');

// Dar de baja usuario
exports.darDeBaja = async (req, res) => {
  try {
    const { id_usuario, motivo_baja } = req.body;

    if (!motivo_baja) return res.status(400).json({ mensaje: 'El motivo de baja es obligatorio' });

    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    await BajaUsuario.create({
      id_usuario,
      motivo_baja,
      fecha_baja: new Date()
    });

    await usuario.update({ estado: 'inactivo' });

    res.json({ mensaje: 'Usuario dado de baja correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al dar de baja al usuario', error });
  }
};

// Reactivar usuario
exports.reactivarUsuario = async (req, res) => {
  try {
    const { id_usuario, motivo_reactivacion } = req.body;

    if (!motivo_reactivacion) return res.status(400).json({ mensaje: 'El motivo de reactivación es obligatorio' });

    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const baja = await BajaUsuario.findOne({
      where: { id_usuario },
      order: [['fecha_baja', 'DESC']]
    });

    if (!baja) return res.status(404).json({ mensaje: 'No se encontró una baja registrada para este usuario' });

    await baja.update({
      fecha_reactivacion: new Date(),
      motivo_reactivacion
    });

    await usuario.update({ estado: 'activo' });

    res.json({ mensaje: 'Usuario reactivado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al reactivar usuario', error });
  }
};

// Listar usuarios dados de baja
exports.listarBajas = async (req, res) => {
  try {
    const bajas = await BajaUsuario.findAll({
      include: [{ model: Usuario }]
    });
    res.json(bajas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las bajas', error });
  }
};  
