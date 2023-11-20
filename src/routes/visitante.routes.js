import express from "express";
import {
  crearVisitante,
  editarVisitante,
  eliminarVisitante,
  eliminarFavorito,
  listarVisitantes,
  obtenerVisitanteId,
} from "../controllers/visitante.controller.js";
import { check } from "express-validator";
import { Validation } from "../middlewares/validation.middleware.js";
import { JWTValidation } from "../middlewares/token-validation.middleware.js";

const router = express.Router();

router.get("/", JWTValidation, listarVisitantes);
router.get("/:id", JWTValidation, obtenerVisitanteId);

router.post(
  "/",
  [
    JWTValidation,
    check("NombreVisita", "Nombre es obligatorio").not().isEmpty(),
    check("ApellidoVisita", "Apellido es obligatorio").not().isEmpty(),
    Validation,
  ],
  crearVisitante
);

router.put("/favorito/:id", JWTValidation, eliminarFavorito);

router.put(
  "/:id",
  [
    JWTValidation,
    check("NombreVisita", "Nombre es obligatorio").not().isEmpty(),
    check("ApellidoVisita", "Apellido es obligatorio").not().isEmpty(),
    Validation,
  ],
  editarVisitante
);

router.delete("/:id", JWTValidation, eliminarVisitante);

export default router;
