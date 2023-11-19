import { DATE } from "sequelize";
import {
  Domicilio,
  Usuario,
  Usuario_domicilio,
} from "../models/asociaciones.js";
import createError from "http-errors";

export const asociarUsuarioDomicilio = async (req, res, next) => {
  const { usuario, domicilio } = req.body;
  try {
    const domicilioBD = await Domicilio.findByPk(domicilio);
    const usuarioBD = await Usuario.findByPk(usuario.id);
    if (!domicilioBD || !usuarioBD) {
      throw new createError(404, "Usuario o domicilio no encontrado/s");
    }
    await domicilioBD.addUsuario(usuarioBD.id, {
      through: {
        Estado: "PENDIENTE",
      },
    });

    res.json({
      mensaje: "Usuario y domicilio asociado correctamente",
      data: {},
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const aprobarUsuarioDomicilio = async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log(id);
    const usuarioDomicilioBD = await Usuario_domicilio.findByPk(id);
    if (!usuarioDomicilioBD) {
      throw new createError(404, "Solicitud no encontrada");
    }
    usuarioDomicilioBD.Estado = "APROBADO";
    usuarioDomicilioBD.FechaActualizacion = Date.now();
    usuarioDomicilioBD.save();

    res.json({
      mensaje: "Aprobado correctamente",
      data: {},
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const rechazarUsuarioDomicilio = async (req, res, next) => {
  const { body, params } = req;
  const { id } = params;
  try {
    const usuarioDomicilioBD = await Usuario_domicilio.findByPk(id);
    if (!usuarioDomicilioBD) {
      throw new createError(404, "Solicitud no encontrada");
    }
    usuarioDomicilioBD.Estado = "RECHAZADO";
    usuarioDomicilioBD.Resolucion = body.resolucion;
    usuarioDomicilioBD.FechaActualizacion = Date.now();
    usuarioDomicilioBD.save();

    res.json({
      mensaje: "Solicitud rechazada",
      data: {},
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
