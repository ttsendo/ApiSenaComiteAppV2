// src/controllers/ProgramasController.js
const { Op } = require('sequelize');
const Programa = require('../models/ProgramasModels');
// const Ficha = require('../models/FichasModels'); // para chequear eliminaciones condicionadas

// 1. Crear programa (validar duplicidad de nombre+versión)
exports.crearPrograma = async (req, res) => {
  try {
    const { nombre_programa, nivel_formacion, version_programa } = req.body;

    // Validar combinación única nombre+versión
    const existe = await Programa.findOne({
      where: {
        nombre_programa,
        version_programa
      }
    });
    if (existe) {
      return res.status(400).json({
        mensaje: 'Ya existe un programa con el mismo nombre y versión'
      });
    }

    const nuevo = await Programa.create({
      nombre_programa,
      nivel_formacion,
      version_programa
    });
    return res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al crear programa', error });
  }
};

// 2. Obtener todos los programas (activos e inactivos)
exports.obtenerProgramas = async (req, res) => {
  try {
    const programas = await Programa.findAll();
    return res.json(programas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener programas', error });
  }
};

// 3. Obtener programa por ID
exports.obtenerProgramaPorId = async (req, res) => {
  try {
    const programa = await Programa.findByPk(req.params.id);
    if (!programa) {
      return res.status(404).json({ mensaje: 'Programa no encontrado' });
    }
    return res.json(programa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener programa', error });
  }
};

// 4. Actualizar datos del programa
exports.actualizarPrograma = async (req, res) => {
  try {
    const programa = await Programa.findByPk(req.params.id);
    if (!programa) {
      return res.status(404).json({ mensaje: 'Programa no encontrado' });
    }
    const { nombre_programa, nivel_formacion, version_programa } = req.body;
    // Opcional: validar duplicidad de versión al cambiar
    if (
      (version_programa && version_programa !== programa.version_programa) &&
      await Programa.findOne({
        where: { nombre_programa: programa.nombre_programa, version_programa }
      })
    ) {
      return res.status(400).json({
        mensaje: 'Ya existe otro programa con esa misma versión'
      });
    }
    await programa.update({ nombre_programa, nivel_formacion, version_programa });
    return res.json({ mensaje: 'Programa actualizado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al actualizar programa', error });
  }
};

// 5. Cambiar estado (activo/inactivo)
exports.cambiarEstadoPrograma = async (req, res) => {
  try {
    const programa = await Programa.findByPk(req.params.id);
    if (!programa) return res.status(404).json({ mensaje: 'Programa no encontrado' });

    const { estado_programa } = req.body;
    if (!['activo', 'inactivo'].includes(estado_programa)) {
      return res.status(400).json({ mensaje: 'Estado inválido' });
    }
    await programa.update({ estado_programa });
    return res.json({ mensaje: `Estado cambiado a ${estado_programa}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al cambiar estado', error });
  }
};

// 6. Eliminar programa (solo si no tiene fichas asociadas)
exports.eliminarPrograma = async (req, res) => {
  try {
    const programa = await Programa.findByPk(req.params.id);
    if (!programa) return res.status(404).json({ mensaje: 'Programa no encontrado' });

    // Comprobar dependencias en fichas
    // const tieneFichas = await Ficha.count({
    //   where: { id_programa: programa.id_programa }
    // });
    // if (tieneFichas > 0) {
    //   return res.status(400).json({
    //     mensaje: 'No se puede eliminar: el programa tiene fichas asociadas'
    //   });
    // }

    await programa.destroy();
    return res.json({ mensaje: 'Programa eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al eliminar programa', error });
  }
};
