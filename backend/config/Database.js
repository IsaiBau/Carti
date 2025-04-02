import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: 1433,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false
        }
    }
});

export default db;