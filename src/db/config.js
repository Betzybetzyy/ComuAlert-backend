import { Sequelize } from "sequelize";

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

export const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});

export const dbConnection = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("DB connection failed, check logs");
  }
};