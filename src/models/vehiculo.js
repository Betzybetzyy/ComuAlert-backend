import { DataTypes } from "sequelize";
import { db } from "../db/config.js";

const Vehiculo = db.define(
  "Vehiculo",
  {
    Patente: {
      type: DataTypes.STRING,
    },
    Marca: {
      type: DataTypes.STRING,
    },
    Modelo: {
      type: DataTypes.STRING,
    },
    Ano: {
      type: DataTypes.NUMBER,
    },
    Color: {
      type: DataTypes.STRING,
    },
    UsuarioId: {
      type: DataTypes.NUMBER,
      field: 'Usuario_Id'
    },
    EsVisita: {
      type: DataTypes.BOOLEAN,
      field: 'Es_visita',
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
    }
  },
  {
    tableName: "Vehiculo",
    timestamps: false,
  }
);

export default Vehiculo;
