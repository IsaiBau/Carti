import express from "express";
import {
    getParadas,
    createRegistroCombi,
    getViajeActivo,
    getParadasRegistradas,
    getParadasByRuta
} from "../controllers/Paradas.js"
/*import { verifyUser } from "../middlewares/AuthUser.js";*/

const router = express.Router();

router.get('/paradas', getParadas)
router.get('/paradas-ruta/:id_ruta', getParadasByRuta)
router.get('/paradas-registradas/:id_viajes', getParadasRegistradas);
router.get('/viaje-activo/:id_unidad', getViajeActivo)
router.post('/crear-registro', createRegistroCombi)
router.get('/ultima-parada/:id_viaje', async (req, res) => {
    try {
      const registro = await RegistroLlegadas.findOne({
        where: { id_viajes: req.params.id_viaje },
        order: [['fecha_llegada', 'DESC']],
        include: [{
          model: Paradas,
          attributes: ['id_paradas']
        }]
      });
      
      res.status(200).json(registro ? registro.parada.id_paradas : null);
    } catch (error) {
      res.status(500).json({msg: error.message});
    }
  });
export default router;