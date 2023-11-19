import { DataTypes } from "sequelize";
import { db } from "../db/config.js";
import { Usuario, Domicilio } from "../models/asociaciones.js";

const Usuario_domicilio = db.define(
  "Usuario_domicilio",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UsuarioId: {
      type: DataTypes.INTEGER,
      field: "Id_usuario",
      references: {
        model: Usuario,
        key: "id",
      },
    },
    DomicilioId: {
      type: DataTypes.INTEGER,
      field: "Id_domicilio",
      references: {
        model: Domicilio,
        key: "id",
      },
    },
    Estado: {
      type: DataTypes.STRING,
    },
    Resolucion: {
      type: DataTypes.STRING,
    },
    FechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "Fecha_creacion",
    },
    FechaActualizacion: {
      type: DataTypes.DATE,
      field: "Fecha_actualizacion",
    },
  },
  {
    tableName: "Usuario_domicilio",
    timestamps: false,
  }
);

export default Usuario_domicilio;
