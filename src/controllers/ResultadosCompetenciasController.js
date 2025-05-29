// src/controllers/ResultadosCompetenciasController.js
const ResultadoCompetencia = require('../models/ResultadosCompetenciasModels');
const CompetenciaPrograma = require('../models/CompetenciasProgramasModels');

// Crear un nuevo resultado
exports.crearResultado = async (req, res) => {
  try {
    const { id_competencia, nombre_resultado } = req.body;

    // Validar que exista la competencia
    const competencia = await CompetenciaPrograma.findByPk(id_competencia);
    if (!competencia) {
      return res.status(400).json({ mensaje: 'La competencia especificada no existe' });
    }

    const nuevo = await ResultadoCompetencia.create({
      id_competencia,
      nombre_resultado
    });
    return res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al crear resultado', error });
  }
};

// Listar todos los resultados
exports.obtenerResultados = async (_req, res) => {
  try {
    const resultados = await ResultadoCompetencia.findAll({
      include: [{ model: CompetenciaPrograma }]
    });
    return res.json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener resultados', error });
  }
};

// Obtener un resultado por su ID
exports.obtenerResultadoPorId = async (req, res) => {
  try {
    const resultado = await ResultadoCompetencia.findByPk(req.params.id, {
      include: [{ model: CompetenciaPrograma }]
    });
    if (!resultado) {
      return res.status(404).json({ mensaje: 'Resultado no encontrado' });
    }
    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener resultado', error });
  }
};

// Actualizar un resultado existente
exports.actualizarResultado = async (req, res) => {
  try {
    const resultado = await ResultadoCompetencia.findByPk(req.params.id);
    if (!resultado) {
      return res.status(404).json({ mensaje: 'Resultado no encontrado' });
    }
    const { nombre_resultado } = req.body;
    await resultado.update({ nombre_resultado });
    return res.json({ mensaje: 'Resultado actualizado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al actualizar resultado', error });
  }
};

// Eliminar un resultado
exports.eliminarResultado = async (req, res) => {
  try {
    const resultado = await ResultadoCompetencia.findByPk(req.params.id);
    if (!resultado) {
      return res.status(404).json({ mensaje: 'Resultado no encontrado' });
    }
    await resultado.destroy();
    return res.json({ mensaje: 'Resultado eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al eliminar resultado', error });
  }
};
