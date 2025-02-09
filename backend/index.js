import express from "express";
import cors from "cors";
import session from "express-session";
import db from './config/Database.js'; //configuracion de la base de datos
import SequelizeStore from "connect-session-sequelize";
//Importaciones de modelos de la base de datos
import Personas from "./models/PersonasModel.js";
import TipoPersonas from "./models/TipoPersonasModel.js";
//Importaciones de routes
import TipoPersonaRoute from "./routes/TipoPersonasRoute.js"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'file-name', 'file-size']
  }));

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}))

app.use(express.json());

app.listen(process.env.APP_PORT, () =>{
    console.log('Servidor encendido y corriendo...')
});
//rutas
app.use(TipoPersonaRoute);
//Conexion con la base de datos
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db:db
});
(async () => {
    try {
      await db.sync({});
      console.log('Base de datos sincronizada');
    } catch (error) {
      console.error('Error al sincronizar la base de datos:', error);
    }
  })();