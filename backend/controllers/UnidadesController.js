import Unidades from "../models/UnidadesModel.js";
import Personas from "../models/PersonasModel.js";
import db from "../config/Database.js";
import { UUID } from "sequelize";

export const getUnidadesConChoferes = async (req, res) => {
    try {
        const [unidades] = await db.query(`
            SELECT 
                u.id_unidades AS id,
                u.placa,
                u.numero,
                CASE 
                    WHEN p.id IS NULL THEN 'Sin chofer asignado'
                    ELSE CONCAT(p.nombre, ' ', p.apellido_pat, ' ', p.apellido_mat)
                END AS choferes,
                p.id AS id_persona
            FROM 
                unidades u
            LEFT JOIN 
                personas p ON u.id_personas = p.id
        `);

        res.status(200).json(unidades);
    } catch (error) {
        console.error("Error en getUnidadesConChoferes:", error);
        res.status(500).json({ 
            message: 'Error al obtener unidades',
            error: error.message 
        });
    }
};

export const createUnidad = async (req, res) => {
    try {
        const { placa, numero, id_personas } = req.body;
        
        // Validación
        if (!placa || !numero || !id_personas) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        // Verificar que el chofer exista
        const chofer = await Personas.findByPk(id_personas);
        if (!chofer) {
            return res.status(400).json({ message: "El chofer no existe" });
        }

        // Crear la unidad
        const nuevaUnidad = await Unidades.create({ placa, numero, id_personas });
        
        res.status(201).json({
            message: "Unidad creada exitosamente",
            data: nuevaUnidad
        });

    } catch (error) {
        console.error('Error en createUnidad:', error);
        res.status(500).json({ message: "Error al crear unidad" });
    }
};

// En tu controlador de unidades (backend)
export const deleteUnidad = async (req, res) => {
    try {
      const unidad = await Unidades.findByPk(req.params.id);
      
      if (!unidad) {
        return res.status(404).json({ msg: "Unidad no encontrada" });
      }
  
      // Primero eliminar registros relacionados
      await ChoferUnidad.destroy({
        where: { id_unidades: unidad.id_unidades }
      });
  
      // Luego eliminar la unidad
      await unidad.destroy();
      
      res.status(200).json({ msg: "Unidad eliminada con éxito" });
      
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };