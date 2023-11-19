import express from "express";
import {
  crearDomicilio,
  eliminarDomicilio,
  listarDomicilio,
} from "../controllers/domicilio.controller.js";
import { check } from "express-validator";
import { Validation } from "../middlewares/validation.middleware.js";
import { JWTValidation } from "../middlewares/token-validation.middleware.js";
import {
  aprobarUsuarioDomicilio,
  asociarUsuarioDomicilio,
  rechazarUsuarioDomicilio,
} from "../controllers/usuario_domicilio.controller.js";
import { RoleValidation } from "../middlewares/role-validation.middleware.js";

const router = express.Router();

router.get("/", JWTValidation, listarDomicilio);

router.post(
  "/",
  [
    JWTValidation,
    check("Direccion", "Direccion es obligatorio").not().isEmpty(),
    check("Comuna", "Comuna es obligatorio").not().isEmpty(),
    check("Condominio", "Condominio es obligatorio").not().isEmpty(),
    Validation,
  ],
  crearDomicilio
);

router.post(
  "/asociar",
  [
    JWTValidation,
    RoleValidation,
    check("domicilio", "Id del domicilio es obligatorio").not().isEmpty(),
    Validation,
  ],
  asociarUsuarioDomicilio
);

router.put("/aprobar/:id", [JWTValidation, RoleValidation], aprobarUsuarioDomicilio);

router.put(
  "/rechazar/:id",
  [
    JWTValidation,
    RoleValidation,
    check("resolucion", "Resolución es obligatorio").not().isEmpty(),
    Validation,
  ],
  rechazarUsuarioDomicilio
);


router.delete("/:id", JWTValidation, eliminarDomicilio);

export default router;
