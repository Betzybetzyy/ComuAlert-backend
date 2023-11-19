import express from "express";
import {
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  obtenerUsuario,
} from "../controllers/usuario.controller.js";
import { check } from "express-validator";
import { Validation } from "../middlewares/validation.middleware.js";
import { JWTValidation } from "../middlewares/token-validation.middleware.js";

const router = express.Router();

router.get("/:id", JWTValidation, obtenerUsuario);
router.post(
  "/",
  [
    check("Rut", "Rut es obligatorio").not().isEmpty(),
    check("Nombre", "Nombre es obligatorio").not().isEmpty(),
    check("Apellido", "Apellido es obligatorio").not().isEmpty(),
    check("Email", "Email es obligatorio").isEmail().not().isEmpty(),
    check("Contrasena", "Contraseña es obligatorio")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    Validation,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    JWTValidation,
    check("Rut", "Rut es obligatorio").not().isEmpty(),
    check("Nombre", "Nombre es obligatorio").not().isEmpty(),
    check("Apellido", "Apellido es obligatorio").not().isEmpty(),
    check("Email", "Email es obligatorio").isEmail().not().isEmpty(),
    check("Contrasena", "Contraseña es obligatorio")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    Validation,
  ],
  editarUsuario
);

router.delete("/:id", JWTValidation, eliminarUsuario);

export default router;
