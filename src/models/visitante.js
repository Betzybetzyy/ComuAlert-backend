import { DataTypes } from "sequelize";
import { db } from "../db/config.js";

const Visitante = db.define(
  "Visitante",
  {
    UsuarioId: {
      type: DataTypes.NUMBER,
      field: 'Usuario_id'
    },
    NombreVisita: {
      type: DataTypes.STRING,
      field: 'Nombre_visita'
    },
    ApellidoVisita: {
      type: DataTypes.STRING,
      field: 'Apellido_visita'
    },
    VehiculoId: {
      type: DataTypes.NUMBER,
      field: 'Vehiculo_id'
    },
    Favorito: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    FechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'Fecha_creacion'
    },
    FechaEdicion: {
      type: DataTypes.DATE,
      field: 'Fecha_edicion'
    },
    Estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Visitante",
    timestamps: false,
  }
);

export default Visitante;
