import { Domicilio } from "../models/asociaciones.js";
import createError from "http-errors";


export const crearDomicilio = async (req, res, next) => {
  const { body } = req;
  try {
    const domicilio = new Domicilio(body);
    await domicilio.save();

    const domicilioObj = domicilio.toJSON();
    res.json({
      mensaje: "Domicilio creado",
      data: domicilioObj,
    });
  } catch (e) {
    console.error("Error en la creación del domicilio:", e.message);
    next(e);
  }
};

export const eliminarDomicilio = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const domicilio = await Domicilio.findByPk(id);
      if (!domicilio) {
        throw new createError(404, "Domicilio no encontrado");
      }
      domicilio.Estado = !domicilio.Estado;
      domicilio.FechaEdicion = Date.now();
      await domicilio.save();
  
      const domicilioEliminado = domicilio.toJSON();
      res.json({
        mensaje: "Domicilio eliminado correctamente",
        data: domicilioEliminado,
      });
    } catch (e) {
      next(e);
    }
  };

  export const listarDomicilio = async (req, res, next) => {
    try {
      const domicilio = await Domicilio.findAll({
        where: {
          Estado: true,
        },
      });
      if (!domicilio) {
        throw new createError(404, "Domicilios no encontrado");
      }
      res.json({
        mensaje: "Domicilios obtenidos",
        data: domicilio,
      });
    } catch (e) {
        console.log(e)
      next(e);
    }
  };

  export const obtenerDomicilioId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const domicilio = await Domicilio.findByPk(id);
      if (!domicilio) {
        throw new createError(404, "Domicilio no encontrado");
      }
      res.json({
        mensaje: "Domicilio obtenido",
        data: domicilio,
      });
    } catch (e) {
        console.log(e)
      next(e);
    }
  };