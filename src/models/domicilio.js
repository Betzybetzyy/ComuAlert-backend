import { DataTypes } from "sequelize";
import { db } from "../db/config.js";

const Domicilio = db.define(
  "Domicilio",
  {
    Direccion: {
      type: DataTypes.STRING,
    },
    Comuna: {
      type: DataTypes.STRING,
    },
    Condominio: {
      type: DataTypes.STRING,
    },
    Estado: {
      type: DataTypes.STRING,
      defaultValue: true,
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
  },
  {
    tableName: "Domicilio",
    timestamps: false,
  }
);

export default Domicilio;
