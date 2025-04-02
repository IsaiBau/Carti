import express from "express";
import { 
    getUnidadesConChoferes,
    createUnidad,
    deleteUnidad
} from "../controllers/UnidadesController.js";

const router = express.Router();

router.get('/unidades', getUnidadesConChoferes);
router.post('/crearUnidad', createUnidad);
router.delete('/unidades/:id', deleteUnidad);

export default router;