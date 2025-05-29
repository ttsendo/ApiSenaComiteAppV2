// src/routes/resultadosCompetencias.routes.js
const express = require('express');
const router = express.Router();
const ResultadosController = require('../controllers/ResultadosCompetenciasController');

// POST   /resultados-competencias       → Crear resultado
router.post('/', ResultadosController.crearResultado);

// GET    /resultados-competencias       → Listar todos los resultados
router.get('/', ResultadosController.obtenerResultados);

// GET    /resultados-competencias/:id   → Obtener resultado por ID
router.get('/:id', ResultadosController.obtenerResultadoPorId);

// PUT    /resultados-competencias/:id   → Actualizar resultado
router.put('/:id', ResultadosController.actualizarResultado);

// DELETE /resultados-competencias/:id   → Eliminar resultado
router.delete('/:id', ResultadosController.eliminarResultado);

module.exports = router;
