import express from "express";
import cors from "cors";
import session from "express-session";
import db from './config/Database.js'; // Configuración de la base de datos
import SequelizeStore from "connect-session-sequelize";

// TLS (https) y lectura de certificados
import fs from "fs";
import https from "https";
import http from "http";

// Importaciones de modelos
import TipoPersonas from "./models/TipoPersonasModel.js";
import Personas from "./models/PersonasModel.js";
import Rutas from "./models/RutasModel.js";
import Paradas from "./models/ParadasModel.js";
import Unidades from "./models/UnidadesModel.js";
import ChoferUnidad from "./models/ChoferUnidadModel.js";
import Finanzas from "./models/FinanzasModel.js";
import Viajes from "./models/ViajesModel.js";
import RegistroLlegadas from "./models/RegistroLlegadasModel.js";

// Importaciones de rutas
import TipoPersonaRoute from "./routes/TipoPersonasRoute.js";
import RutasRoute from "./routes/RutasRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import UnidadesRoute from "./routes/UnidadesRoute.js";
import ParadasRoute from "./routes/ParadasRoute.js";
import PersonasRoute from "./routes/personasRoutes.js";
import UnidadesRoutes from './routes/UnidadesRoutes.js';

import dotenv from "dotenv";
dotenv.config();

const app = express();

// CORS
app.use(cors({
    credentials: true,
    origin: 'https://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'file-name', 'file-size', 'x-access-token']
}));
app.options('*', cors());

// Sesión
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto' 
    }
}));

app.use(express.json());

// Rutas
app.use(TipoPersonaRoute);
app.use(AuthRoute);
app.use(UnidadesRoute);
app.use(ParadasRoute);
app.use(RutasRoute);
app.use(UnidadesRoutes);
app.use(PersonasRoute);

// Sesión en base de datos
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db: db });

// Sincronizar DB
(async () => {
    try {
        await db.sync();
        console.log('Base de datos sincronizada');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
})();

// TLS: leer certificados
const sslOptions = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem'),
};

// Iniciar servidor HTTPS (TLS)
https.createServer(sslOptions, app).listen(443, () => {
    console.log('Servidor HTTPS (TLS) corriendo en puerto 443');
});

// (Opcional) Redireccionar HTTP a HTTPS
http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
    res.end();
}).listen(80);
