import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnection } from "./src/db/config.js";
import usuarioRoutes from "./src/routes/usuario.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { errorHandler } from "./src/utils/error.handler.js";
import domicilioRoutes from "./src/routes/domicilio.routes.js";
import vehiculoRoutes from "./src/routes/vehiculo.routes.js";
import visitaRoutes from "./src/routes/visita.routes.js";
import visitanteRoutes from "./src/routes/visitante.routes.js";
import alertaRoutes from "./src/routes/alerta.routes.js";
import patenteRoutes from "./src/routes/detector-imagenes.routes.js"

const app = express();
dbConnection();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/domicilio", domicilioRoutes);
app.use("/api/vehiculo", vehiculoRoutes);
app.use("/api/visita", visitaRoutes);
app.use("/api/visitante", visitanteRoutes);
app.use("/api/alerta", alertaRoutes);
app.use("/api/patentes", patenteRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
