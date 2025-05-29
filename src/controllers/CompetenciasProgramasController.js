// src/controllers/CompetenciasProgramasController.js
const { Op } = require('sequelize');
const CompetenciaPrograma = require('../models/CompetenciasProgramasModels');
const Programa = require('../models/ProgramasModels');

// Crear competencia
exports.crearCompetencia = async (req, res) => {
  try {
    const { id_programa, nombre_competencia, numero_horas_competencia } = req.body;

    // Validar que el programa exista
    const programa = await Programa.findByPk(id_programa);
    if (!programa) {
      return res.status(400).json({ mensaje: 'El programa especificado no existe' });
    }

    const nueva = await CompetenciaPrograma.create({
      id_programa,
      nombre_competencia,
      numero_horas_competencia
    });
    return res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al crear competencia', error });
  }
};

// Obtener todas las competencias
exports.obtenerCompetencias = async (_req, res) => {
  try {
    const competencias = await CompetenciaPrograma.findAll({
      include: [{ model: Programa }]
    });
    return res.json(competencias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener competencias', error });
  }
};

// Obtener competencia por ID
exports.obtenerCompetenciaPorId = async (req, res) => {
  try {
    const competencia = await CompetenciaPrograma.findByPk(req.params.id, {
      include: [{ model: Programa }]
    });
    if (!competencia) {
      return res.status(404).json({ mensaje: 'Competencia no encontrada' });
    }
    return res.json(competencia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener competencia', error });
  }
};

// Actualizar competencia
exports.actualizarCompetencia = async (req, res) => {
  try {
    const competencia = await CompetenciaPrograma.findByPk(req.params.id);
    if (!competencia) {
      return res.status(404).json({ mensaje: 'Competencia no encontrada' });
    }
    const { nombre_competencia, numero_horas_competencia } = req.body;
    await competencia.update({ nombre_competencia, numero_horas_competencia });
    return res.json({ mensaje: 'Competencia actualizada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al actualizar competencia', error });
  }
};

// Eliminar competencia
exports.eliminarCompetencia = async (req, res) => {
  try {
    const competencia = await CompetenciaPrograma.findByPk(req.params.id);
    if (!competencia) {
      return res.status(404).json({ mensaje: 'Competencia no encontrada' });
    }
    await competencia.destroy();
    return res.json({ mensaje: 'Competencia eliminada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al eliminar competencia', error });
  }
};
