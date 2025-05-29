// src/routes/usuarios.routes.js
const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');

// GET    /usuarios           → Obtener todos los usuarios activos
router.get('/', UsuariosController.obtenerUsuarios);

// GET    /usuarios/:id       → Obtener usuario por ID
router.get('/:id', UsuariosController.obtenerUsuarioPorId);

// POST   /usuarios           → Crear un nuevo usuario
router.post('/', UsuariosController.crearUsuario);

// PUT    /usuarios/:id       → Actualizar un usuario existente
router.put('/:id', UsuariosController.actualizarUsuario);

module.exports = router;
