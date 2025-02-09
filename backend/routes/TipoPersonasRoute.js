import express from "express";
import {
    getTipoPersonas,
    getTipoPersonasById,
    createTipoPersonas,
    updateTipoPersonas,
    deleteTipoPersonas
} from "../controllers/TipoPersonas.js"
/*import { verifyUser } from "../middlewares/AuthUser.js";*/

const router = express.Router();

router.get('/tipo-personas', getTipoPersonas)
router.get('/tipo-personas/:id', getTipoPersonasById)
router.post('/tipo-personas', createTipoPersonas)
router.patch('/tipo-personas/:id', updateTipoPersonas)
router.delete('/tipo-personas/:id',deleteTipoPersonas)

export default router;