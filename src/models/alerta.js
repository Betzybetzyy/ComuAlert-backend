import { DataTypes } from "sequelize";
import { db } from "../db/config.js";

const Alerta = db.define(
  "Alerta",
  {
    Motivo: {
      type: DataTypes.STRING,
    },
    Descripcion: {
      type: DataTypes.STRING,
    },
    Prioridad: {
      type: DataTypes.NUMBER,
    },
    Estado: {
      type: DataTypes.STRING,
      defaultValue: "PENDIENTE",
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
    Responsable: {
      type: DataTypes.NUMBER,
    },
    UsuarioId: {
      type: DataTypes.NUMBER,
      field: 'Usuario_Id'
    },
    Resolucion: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Alerta",
    timestamps: false,
  }
);

export default Alerta;
