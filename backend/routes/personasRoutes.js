import express from "express";
import {
    getPersonas,
    getPersonasById,
    createPersonas,
    updatePersonas,
    deletePersonas,
    getTrabajadoresByDueno,
    getAllDuenosTrabajadores
} from "../controllers/Personas.js";


const router = express.Router();

router.get('/personas', getPersonas);
router.get('/choferes/:duenoId', getTrabajadoresByDueno);
router.get('/choferes-duenos/', getAllDuenosTrabajadores);
router.get('/personas/:id', getPersonasById);
router.post('/personas', createPersonas);
router.patch('/personas/:id', updatePersonas);
router.delete('/personas/:id', deletePersonas);

export default router;
