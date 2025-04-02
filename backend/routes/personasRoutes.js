import express from "express";
import {
    getPersonas,
    getPersonasById,
    createPersonas,
    updatePersonas,
    deletePersonas,
    getTrabajadoresByDueno,
    getAllDuenosTrabajadores,
    getChoferes
} from "../controllers/Personas.js";


const router = express.Router();

router.get('/personas', getPersonas);
router.get('/choferes/:duenoId', getTrabajadoresByDueno);
router.get('/choferes-duenos/', getAllDuenosTrabajadores);
router.get('/personas/:id', getPersonasById);
router.post('/personas', createPersonas);
router.patch('/personas/:id', updatePersonas);
router.delete('/personas/:id', deletePersonas);
// router.get('/personas/choferes', getChoferes);

// Rutas específicas para choferes
router.get('/tipo/choferes', getChoferes); // Cambiado a una ruta más específica
export default router;
