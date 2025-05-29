// src/routes/programas.routes.js
const express = require('express');
const router = express.Router();
const ProgramasController = require('../controllers/ProgramasController');

// POST   /programas             → Crear programa
router.post('/', ProgramasController.crearPrograma);

// GET    /programas             → Listar todos los programas
router.get('/', ProgramasController.obtenerProgramas);

// GET    /programas/:id         → Obtener programa por ID
router.get('/:id', ProgramasController.obtenerProgramaPorId);

// PUT    /programas/:id         → Actualizar programa
router.put('/:id', ProgramasController.actualizarPrograma);

// PATCH  /programas/:id/estado  → Cambiar estado
router.patch('/:id/estado', ProgramasController.cambiarEstadoPrograma);

// DELETE /programas/:id         → Eliminar programa (si no tiene fichas)
router.delete('/:id', ProgramasController.eliminarPrograma);

module.exports = router;
