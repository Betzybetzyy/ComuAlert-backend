import express from "express";
import {
    crearVisita,
    editarVisita,
    eliminarVisita,
    listarVisitas,
} from "../controllers/visita.controller.js";
import { check } from "express-validator";
import { Validation } from "../middlewares/validation.middleware.js";
import { JWTValidation } from "../middlewares/token-validation.middleware.js";

const router = express.Router();

router.get("/", JWTValidation, listarVisitas);

router.post(
  "/",
  [
    JWTValidation,
    check("Fecha", "Fecha es obligatoria").not().isEmpty(),
    Validation,
  ],
  crearVisita
);

router.put(
    "/:id",
    [
      JWTValidation,
      check("VisitanteId", "Visitante es obligatorio").not().isEmpty(),
      check("Fecha", "Fecha es obligatorio").not().isEmpty(),
      Validation,
    ],
    editarVisita
  );
  

router.delete("/:id", JWTValidation, eliminarVisita);


export default router;