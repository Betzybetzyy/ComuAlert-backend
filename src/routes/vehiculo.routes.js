import express from "express";
import {
  crearVehiculo,
  editarVehiculo,
  eliminarVehiculo,
  listarVehiculos,
  buscarPatente,
  buscarVehiculoId
} from "../controllers/vehiculo.controller.js";
import { check } from "express-validator";
import { Validation } from "../middlewares/validation.middleware.js";
import { JWTValidation } from "../middlewares/token-validation.middleware.js";

const router = express.Router();

router.get("/", JWTValidation, listarVehiculos);

router.get("/patente/:patente", JWTValidation, buscarPatente);
router.get("/:id", JWTValidation, buscarVehiculoId);

router.post(
  "/",
  [
    JWTValidation,
    check("Patente", "Patente es obligatorio").not().isEmpty(),
    Validation,
  ],
  crearVehiculo
);

router.put(
    "/:id",
    [
      JWTValidation,
      check("Patente", "Patente es obligatorio").not().isEmpty(),
      Validation,
    ],
    editarVehiculo
  );

router.delete("/:id", JWTValidation, eliminarVehiculo);


export default router;
