import {Usuario} from "../models/asociaciones.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const { Email, Contrasena } = req.body;
    const usuario = await Usuario.findOne({
      where: {
        Email: Email,
      },
    });
    if (!usuario) {
      throw new createError(404, "Usuario no encontrado");
    }

    const contrasenaValida = bcrypt.compareSync(Contrasena, usuario.Contrasena);
    if (!contrasenaValida) {
      throw new createError(401, "Email o contraseña inválida");
    }

    const usuarioObj = usuario.toJSON();
    delete usuarioObj.Contrasena;
    const token = await generarToken(usuarioObj);
    res.json({
        token,
      });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const generarToken = (usuario) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      usuario,
      process.env.SECRET_TOKEN,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          reject("Error al generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
