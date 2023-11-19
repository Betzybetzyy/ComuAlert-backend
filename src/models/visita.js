import { DataTypes } from "sequelize";
import { db } from "../db/config.js";

const Visita = db.define(
  "Visita",
  {
    UsuarioId: {
      type: DataTypes.NUMBER,
      field: 'Usuario_id'
    },
    VisitanteId: {
      type: DataTypes.NUMBER,
      field: 'Visitante_id'
    },
    Fecha: {
      type: DataTypes.DATE,
    },
    CantidadPersonas: {
      type: DataTypes.NUMBER,
      field: 'Cantidad_personas'
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
    tableName: "Visita",
    timestamps: false,
  }
);

export default Visita;
