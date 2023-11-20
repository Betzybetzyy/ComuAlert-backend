import express from "express";
import {
  crearAlerta,
  editarAlerta,
  rechazarAlerta,
  aprobarAlerta,
  listarAlertas,
} from "../controllers/alerta.controller.js";
import { check } from "express-validator";
import { Validation } from "../middlewares/validation.middleware.js";
import { JWTValidation } from "../middlewares/token-validation.middleware.js";
import { RoleValidation } from "../middlewares/role-validation.middleware.js";

const router = express.Router();

router.get("/", JWTValidation, listarAlertas);

router.post(
  "/",
  [
    JWTValidation,
    check("Motivo", "Motivo es obligatorio").not().isEmpty(),
    Validation,
  ],
  crearAlerta
);

router.put(
  "/rechazar/:id",
  [
    JWTValidation,
    RoleValidation,
    check("Resolucion", "Resolucion es obligatorio").not().isEmpty(),
    Validation,
  ],
  rechazarAlerta
);

router.put("/aprobar/:id", [JWTValidation, RoleValidation], aprobarAlerta);
router.put(
  "/:id",
  [
    JWTValidation,
    check("Motivo", "Motivo es obligatorio").not().isEmpty(),
    check("Prioridad", "Prioridad es obligatorio").not().isEmpty(),
    Validation,
  ],
  editarAlerta
);

export default router;
