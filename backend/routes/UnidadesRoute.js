import express from "express";
import {
    getUnidadesConChoferes,
    getUnidades
} from "../controllers/Unidades.js"
/*import { verifyUser } from "../middlewares/AuthUser.js";*/

const router = express.Router();

router.get('/unidades-choferes/:duenoId', getUnidadesConChoferes)
router.get('/unidades', getUnidades)
export default router;