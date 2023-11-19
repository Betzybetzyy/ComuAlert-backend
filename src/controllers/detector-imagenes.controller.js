import { ImageAnnotatorClient } from "@google-cloud/vision";
import createHttpError from "http-errors";
import { googleConfig } from "../utils/google-secret.helper.js";

const client = new ImageAnnotatorClient({
  credentials: googleConfig,
});
const PATENTE_REGEX = /([A-Z]{2})\W*([A-Z]{2})\W*(\d{2})/;

export const detectorPatentes = async (req, res, next) => {
  try {
    const { buffer } = req.file;

    const [result] = await client.textDetection(buffer);
    const detections = result.textAnnotations;
    const descriptions = detections.map((detection) => detection.description);
    const fullDescription = descriptions.join(" ");

    const licensePlate = fullDescription.match(PATENTE_REGEX);
    const plate = licensePlate ? licensePlate.slice(1, 4).join("") : null;

    if (!plate) {
      throw new createHttpError(404, "Patente no encontrada");
    }
    res.status(200).json({ data: plate });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
