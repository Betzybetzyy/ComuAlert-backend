import { DataTypes } from "sequelize";
import { db } from "../db/config.js";

const Usuario = db.define(
  "Usuario",
  {
    Rut: {
      type: DataTypes.STRING,
    },
    Nombre: {
      type: DataTypes.STRING,
    },
    Apellido: {
      type: DataTypes.STRING,
    },
    DomicilioId: {
      type: DataTypes.NUMBER,
      field: 'Domicilio_Id'
    },
    Contrasena: {
      type: DataTypes.STRING,
    },
    Rol: {
      type: DataTypes.STRING,
      defaultValue: "USER",
    },
    Estado: {
      type: DataTypes.BOOLEAN,
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
    Email: {
        type: DataTypes.STRING,
      }
  },
  {
    tableName: "Usuario",
    timestamps: false,
  }
);

export default Usuario;
