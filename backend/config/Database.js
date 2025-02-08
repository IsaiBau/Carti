import { Sequelize } from "sequelize";

const db = new Sequelize('nombre-de-la-bd', 'root', '', {
    host: "localhost",
    dialect: "mssql"
});

export default db;