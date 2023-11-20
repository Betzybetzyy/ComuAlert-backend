import { Visita } from "../models/asociaciones.js";
import createError from "http-errors";


export const crearVisita = async (req, res, next) => {
  const { body } = req;
  try {
    const visita = new Visita(body);
    visita.UsuarioId = body.usuario.id
    await visita.save();

    const visitaObj = visita.toJSON();
    res.json({
      mensaje: "Visita creada",
      data: visitaObj,
    });
  } catch (e) {
    console.error("Error al crear la visita", e.message);
    next(e);
  }
};

export const editarVisita = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
  
    try {
      const visita = await Visita.findByPk(id);
      if (!visita) {
        throw new createError(404, "Visita no encontrada");
      }
  
      visita.VisitanteId = body.VisitanteId;
      visita.Fecha = body.Fecha;
      visita.UsuarioId = body.usuario.id
      visita.CantidadPersonas = body.CantidadPersonas;
      visita.FechaEdicion = Date.now();
      await visita.save();
  
      const visitaEditada = visita.toJSON();
      res.json({
        mensaje: "Visita editado correctamente",
        data: visitaEditada,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

export const eliminarVisita = async (req, res, next) => {
  const { id } = req.params;

  try {
    const visita = await Visita.findByPk(id);
    if (!visita) {
      throw new createError(404, "Visita no encontrada");
    }
    visita.FechaEdicion = Date.now();
    await visita.save();

    const visitaEliminada = visita.toJSON();
    res.json({
      mensaje: "Visita eliminada correctamente",
      data: visitaEliminada,
    });
  } catch (e) {
    next(e);
  }
};

export const listarVisitas = async (req, res, next) => {
  try {
    const visita = await Visita.findAll({
      where: {
        Estado: true,
      },
    });
    if (!visita) {
      throw new createError(404, "Visitas no encontradas");
    }
    res.json({
      mensaje: "Visitas obtenidas",
      data: visita,
    });
  } catch (e) {
    next(e);
  }
};

export const obtenerVisitaId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const visita = await Visita.findByPk(id);
    if (!visita) {
      throw new createError(404, "Visita no encontrado");
    }
    res.json({
      mensaje: "Visita obtenido",
      data: visita,
    });
  } catch (e) {
      console.log(e)
    next(e);
  }
};