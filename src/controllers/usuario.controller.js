import { Usuario } from "../models/asociaciones.js";
import bcrypt from "bcrypt";
import createError from "http-errors";


export const crearUsuario = async (req, res, next) => {
  const { body } = req;
  try {
    const salt = await bcrypt.genSalt(10);
    const encriptada = await bcrypt.hash(body.Contrasena, salt);
    body.Contrasena = encriptada;
    const usuario = new Usuario(body);
    await usuario.save();

    const usuarioObj = usuario.toJSON();
    delete usuarioObj.Contrasena;
    res.json({
      mensaje: "Usuario creado",
      data: usuarioObj,
    });
  } catch (e) {
    console.error("Error en la creación del usuario:", e.message);
    next(e);
  }
};

export const obtenerUsuario = async (req, res, next) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new createError(404, "Usuario no encontrado");
    }
    const usuarioObj = usuario.toJSON();
    delete usuarioObj.Contrasena;
    res.json({
      mensaje: "Usuario obtenido",
      data: usuarioObj,
    });
  } catch (e) {
    next(e);
  }
};

export const editarUsuario = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new createError(404, "Usuario no encontrado");
    }

    usuario.Nombre = body.Nombre;
    usuario.Apellido = body.Apellido;
    usuario.Email = body.Email;
    usuario.Contrasena = body.Contrasena;
    usuario.FechaEdicion = Date.now();
    await usuario.save();

    const usuarioEditado = usuario.toJSON();
    delete usuarioEditado.Contrasena;
    res.json({
      mensaje: "Usuario editado correctamente",
      data: usuarioEditado,
    });
  } catch (e) {
    next(e);
  }
};

export const eliminarUsuario = async (req, res, next) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new createError(404, "Usuario no encontrado");
    }
    usuario.FechaEdicion = Date.now();
    usuario.Estado = !usuario.Estado;
    await usuario.save();

    const usuarioEliminado = usuario.toJSON();
    delete usuarioEliminado.Contrasena;
    res.json({
      mensaje: "Usuario eliminado correctamente",
      data: usuarioEliminado,
    });
  } catch (e) {
    next(e);
  }
};
