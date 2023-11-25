import express from "express";
import { login } from "../controllers/auth.controller.js";
import { Validation } from "../middlewares/validation.middleware.js";
import { check } from "express-validator";

const router = express.Router();

router.post("/", [
    check("Email", "Email es obligatorio").not().isEmpty(),
    check("Contrasena", "Contraseña es obligatoria").not().isEmpty(),
    Validation
] ,login);

export default router;