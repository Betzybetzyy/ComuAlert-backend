import { Visitante } from "../models/asociaciones.js";
import createError from "http-errors";

export const crearVisitante = async (req, res, next) => {
  const { body } = req;
  console.log(body);
  try {
    const visitante = new Visitante(body);
    visitante.UsuarioId = body.usuario.id

    await visitante.save();

    const visitanteObj = visitante.toJSON();
    res.json({
      mensaje: "Visitante creado",
      data: visitanteObj,
    });
  } catch (e) {
    console.error("Error al crear el visitante", e);
    next(e);
  }
};

export const editarVisitante = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
  
    console.log({id, body});
    try {
      const visitante = await Visitante.findByPk(id);
      console.log(body);
      if (!visitante) {
        throw new createError(404, "Visitante no encontrado");
      }
  
      visitante.NombreVisita = body.NombreVisita;
      visitante.UsuarioId = body.usuario.id
      visitante.ApellidoVisita = body.ApellidoVisita;
      visitante.VehiculoId = body.VehiculoId;
      visitante.FechaEdicion = Date.now();
      await visitante.save();
  
      const visitanteEditado = visitante.toJSON();
      res.json({
        mensaje: "Visitante editado correctamente",
        data: visitanteEditado,
      });
    } catch (e) {
        console.log(e);
      next(e);
    }
  };

export const eliminarVisitante = async (req, res, next) => {
  const { id } = req.params;

  try {
    const visitante = await Visitante.findByPk(id);
    if (!visitante) {
      throw new createError(404, "Visitante no encontrado");
    }
    visitante.Estado = !visitante.Estado;
    visitante.FechaEdicion = Date.now();
    await visitante.save();

    const visitanteEliminado = visitante.toJSON();
    res.json({
      mensaje: "Visitante eliminado correctamente",
      data: visitanteEliminado,
    });
  } catch (e) {
    next(e);
  }
};

export const eliminarFavorito = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const visitante = await Visitante.findByPk(id);
      if (!visitante) {
        throw new createError(404, "Visitante no encontrado");
      }
      visitante.Favorito = !visitante.Favorito;
      visitante.FechaEdicion = Date.now();
      await visitante.save();
  
      const favoritoEliminado = visitante.toJSON();
      res.json({
        mensaje: "Favorito eliminado correctamente",
        data: favoritoEliminado,
      });
    } catch (e) {
        console.log(e);
      next(e);
    }
  };

  export const listarVisitantes = async (req, res, next) => {
    try {
      const visitante = await Visitante.findAll({
        where: {
          Estado: true,
        },
      });
      if (!visitante) {
        throw new createError(404, "Visitantes no encontrados");
      }
      res.json({
        mensaje: "Visitantes obtenidas",
        data: visitante,
      });
    } catch (e) {
      next(e);
    }
  };

  export const obtenerVisitanteId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const visitante = await Visitante.findByPk(id);
      if (!visitante) {
        throw new createError(404, "Visitante no encontrado");
      }
      res.json({
        mensaje: "Visitante obtenido",
        data: visitante,
      });
    } catch (e) {
        console.log(e)
      next(e);
    }
  };