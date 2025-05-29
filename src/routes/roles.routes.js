// src/routes/roles.routes.js
const express = require('express');
const router = express.Router();
const Rol = require('../models/RolesModels');

// GET /roles → Listar todos los roles (solo lectura)
router.get('/', async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener roles', error });
  }
});

module.exports = router;
