import { Vehiculo } from "../models/asociaciones.js";
import createError from "http-errors";

export const crearVehiculo = async (req, res, next) => {
  const { body } = req;
  try {
    const vehiculo = new Vehiculo(body);
    vehiculo.UsuarioId = body.usuario.id;
    vehiculo.EsVisita = body.EsVisita;
    await vehiculo.save();

    const vehiculoObj = vehiculo.toJSON();
    res.json({
      mensaje: "Vehiculo creado",
      data: vehiculoObj,
    });
  } catch (e) {
    console.error("Error al crear el vehículo", e.message);
    next(e);
  }
};

export const editarVehiculo = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) {
      throw new createError(404, "Vehiculo no encontrado");
    }

    vehiculo.Marca = body.Marca;
    vehiculo.Modelo = body.Modelo;
    vehiculo.Ano = body.Ano;
    vehiculo.FechaEdicion = Date.now();
    vehiculo.EsVisita = body.EsVisita;
    await vehiculo.save();

    const vehiculoEditado = vehiculo.toJSON();
    res.json({
      mensaje: "Vehiculo editado correctamente",
      data: vehiculoEditado,
    });
  } catch (e) {
    next(e);
  }
};

export const eliminarVehiculo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) {
      throw new createError(404, "Vehiculo no encontrado");
    }
    vehiculo.Estado = !vehiculo.Estado;
    vehiculo.FechaEdicion = Date.now();
    await vehiculo.save();

    const vehiculoEliminado = vehiculo.toJSON();
    res.json({
      mensaje: "Vehiculo eliminado correctamente",
      data: vehiculoEliminado,
    });
  } catch (e) {
    next(e);
  }
};

export const listarVehiculos = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.findAll({
      where: {
        Estado: true,
        UsuarioId: req.body.usuario.id,
      },
    });
    if (!vehiculo) {
      throw new createError(404, "Vehiculo no encontrado");
    }
    res.json({
      mensaje: "Vehiculo obtenidos",
      data: vehiculo,
    });
  } catch (e) {
    next(e);
  }
};

export const buscarPatente = async (req, res, next) => {
  const { patente } = req.params;
  try {
    const vehiculo = await Vehiculo.findOne({
      where: {
        Patente: patente,
      },
    });
    if (!vehiculo) {
      throw new createError(404, "Vehiculo no encontrado");
    }
    res.json({
      mensaje: "Vehiculo obtenido",
      data: vehiculo,
    });
  } catch (e) {
    next(e);
  }
};

export const buscarVehiculoId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) {
      throw new createError(404, "Vehiculo no encontrado");
    }
    res.json({
      mensaje: "Vehiculo obtenido",
      data: vehiculo,
    });
  } catch (e) {
    next(e);
  }
};
