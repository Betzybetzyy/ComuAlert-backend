import express from "express";
import multer from "multer";
import { detectorPatentes } from "../controllers/detector-imagenes.controller.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/lector", upload.single("image"), detectorPatentes);

export default router;
