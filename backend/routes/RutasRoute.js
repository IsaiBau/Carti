import express from "express";
import {
    finalizarViaje,
    getChoferUnidad,
    getRutas,
    getUnidadesChofer,
    getViajeActivoChofer,
    iniciarViaje
} from "../controllers/Rutas.js"
/*import { verifyUser } from "../middlewares/AuthUser.js";*/

const router = express.Router();

router.get('/rutas', getRutas)
router.get('/unidades-chofer/:id_chofer',getUnidadesChofer)
router.get('/chofer-unidad/:id_chofer/:id_unidad',getChoferUnidad)
router.get('/viaje-activo-chofer/:id_chofer',getViajeActivoChofer)
router.post('/iniciar-viaje',iniciarViaje)
router.put('/finalizar-viaje/:id_viaje',finalizarViaje)
export default router;