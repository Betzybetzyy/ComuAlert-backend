import { Alerta } from "../models/asociaciones.js";
import createError from "http-errors";


export const crearAlerta = async (req, res, next) => {
  const { body } = req;
  try {
    const alerta = new Alerta(body);
    alerta.UsuarioId = body.usuario.id
    await alerta.save();

    const alertaObj = alerta.toJSON();
    res.json({
      mensaje: "Visita creada",
      data: alertaObj,
    });
  } catch (e) {
    console.error("Error al crear la alerta", e.message);
    next(e);
  }
};

export const editarAlerta = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
  
    try {
      const alerta = await Alerta.findByPk(id);
      if (!alerta) {
        throw new createError(404, "Alerta no encontrada");
      }
  
      alerta.Motivo = body.Motivo;
      alerta.UsuarioId = body.usuario.id
      alerta.Descripcion = body.Descripcion;
      alerta.Prioridad = body.Prioridad;
      alerta.FechaEdicion = Date.now();
      await alerta.save();
  
      const alertaEditada = alerta.toJSON();
      res.json({
        mensaje: "Alerta editada correctamente",
        data: alertaEditada,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  export const rechazarAlerta = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
  
    try {
      const alerta = await Alerta.findByPk(id);
      if (!alerta) {
        throw new createError(404, "Alerta no encontrada");
      }
  
      alerta.Estado = 'RECHAZADA';
      alerta.Responsable = body.usuario.id
      alerta.Resolucion = body.Resolucion;
      alerta.FechaEdicion = Date.now();
      await alerta.save();
  
      const alertaEditada = alerta.toJSON();
      res.json({
        mensaje: "Alerta rechazada",
        data: alertaEditada,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  export const aprobarAlerta = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
  
    try {
      const alerta = await Alerta.findByPk(id);
      if (!alerta) {
        throw new createError(404, "Alerta no encontrada");
      }
  
      alerta.Estado = 'APROBADA';
      alerta.Responsable = body.usuario.id
      alerta.FechaEdicion = Date.now();
      await alerta.save();
  
      const alertaEditada = alerta.toJSON();
      res.json({
        mensaje: "Alerta aprobada correctamente",
        data: alertaEditada,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  export const listarAlertas = async (req, res, next) => {
    try {
      const alerta = await Alerta.findAll({
        order: [
          ['FechaCreacion', 'DESC']
        ]
      });
      if (!alerta) {
        throw new createError(404, "Alertas no encontrados");
      }
      res.json({
        mensaje: "Alertas obtenidas",
        data: alerta,
      });
    } catch (e) {
      next(e);
    }
  };

  