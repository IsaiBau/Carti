import express from "express";
import {
    getUnidadesConChoferes
} from "../controllers/Unidades.js"
/*import { verifyUser } from "../middlewares/AuthUser.js";*/

const router = express.Router();

router.get('/unidades-choferes/:duenoId', getUnidadesConChoferes)

export default router;