import express from "express";
import {
    getParadas,
    createRegistroCombi,
    getViajeActivo,
    getParadasRegistradas
} from "../controllers/Paradas.js"
/*import { verifyUser } from "../middlewares/AuthUser.js";*/

const router = express.Router();

router.get('/paradas', getParadas)
router.get('/paradas-registradas/:id_viajes', getParadasRegistradas);
router.get('/viaje-activo/:id_unidad', getViajeActivo)
router.post('/crear-registro', createRegistroCombi)
export default router;