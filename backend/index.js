import express from "express";
import cors from "cors";
import session from "express-session";
import db from './config/Database.js'; // Configuración de la base de datos
import SequelizeStore from "connect-session-sequelize";
//Importaciones de modelos de la base de datos
import TipoPersonas from "./models/TipoPersonasModel.js";
import Personas from "./models/PersonasModel.js";
import Rutas from "./models/RutasModel.js";
import Paradas from "./models/ParadasModel.js";
import Unidades from "./models/UnidadesModel.js";
import ChoferUnidad from "./models/ChoferUnidadModel.js";
import Finanzas from "./models/FinanzasModel.js";
import Viajes from "./models/ViajesModel.js";
import RegistroLlegadas from "./models/RegistroLlegadasModel.js";
//Importaciones de routes
import TipoPersonaRoute from "./routes/TipoPersonasRoute.js"
import RutasRoute from "./routes/RutasRoute.js";
import AuthRoute from "./routes/AuthRoute.js"
import UnidadesRoute from "./routes/UnidadesRoute.js"
import ParadasRoute from "./routes/ParadasRoute.js"
import dotenv from "dotenv"
import PersonasRoute from "./routes/personasRoutes.js"; // Importa la ruta de personas

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
}));

app.use(express.json());

app.listen(process.env.APP_PORT, () => {
    console.log('Servidor encendido y corriendo...');
});

// Rutas
app.use(TipoPersonaRoute);
app.use(AuthRoute);
app.use(UnidadesRoute);
app.use(ParadasRoute)
app.use(RutasRoute)
//Conexion con la base de datos
app.use(PersonasRoute); // Usar las rutas de personas
// Conexión con la base de datos
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});
(async () => {
    try {
        await db.sync();
        console.log('Base de datos sincronizada');
        
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
})();
