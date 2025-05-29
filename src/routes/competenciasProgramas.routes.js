// src/routes/competenciasProgramas.routes.js
const express = require('express');
const router = express.Router();
const CompetenciasController = require('../controllers/CompetenciasProgramasController');

// POST   /competencias-programas        → Crear competencia
router.post('/', CompetenciasController.crearCompetencia);

// GET    /competencias-programas        → Listar todas las competencias
router.get('/', CompetenciasController.obtenerCompetencias);

// GET    /competencias-programas/:id    → Obtener competencia por ID
router.get('/:id', CompetenciasController.obtenerCompetenciaPorId);

// PUT    /competencias-programas/:id    → Actualizar competencia
router.put('/:id', CompetenciasController.actualizarCompetencia);

// DELETE /competencias-programas/:id    → Eliminar competencia
router.delete('/:id', CompetenciasController.eliminarCompetencia);

module.exports = router;
