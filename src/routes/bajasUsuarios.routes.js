// src/routes/bajasUsuarios.routes.js
const express = require('express');
const router = express.Router();
const BajasController = require('../controllers/BajasUsuariosController');

// POST   /bajas-usuarios          → Dar de baja un usuario
router.post('/', BajasController.darDeBaja);

// POST   /bajas-usuarios/reactivar → Reactivar un usuario
router.post('/reactivar', BajasController.reactivarUsuario);

// GET    /bajas-usuarios          → Listar todos los registros de baja
router.get('/', BajasController.listarBajas);

module.exports = router;
