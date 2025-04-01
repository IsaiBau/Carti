import Unidades from "../models/UnidadesModel.js";
import { Sequelize, Op } from "sequelize";
import ChoferUnidad from "../models/ChoferUnidadModel.js";
import Personas from "../models/PersonasModel.js";
export const getUnidadesConChoferes = async (req, res) => {
    try {
        const duenoId = req.params.duenoId;
        
        // 1. Obtener unidades del dueño con sus choferes
        const unidades = await Unidades.findAll({
            where: { id_personas: duenoId },
            attributes: ['id_unidades', 'numero', 'placa'],
            include: [{
                model: ChoferUnidad,
                attributes: ['turno'],
                include: [{
                    model: Personas,
                    attributes: ['nombre', 'apellido_pat', 'apellido_mat'],
                    where: { id_tipo_persona: 2 } // Solo choferes
                }]
            }],
            order: [['numero', 'ASC']] // Ordenar por número de unidad
        });

        // 2. Formatear respuesta
        const resultado = unidades.map(unidad => ({
            id: unidad.id_unidades,
            numero: unidad.numero,
            placa: unidad.placa,
            choferes: unidad.chofer_unidads.map(asignacion => ({
                nombre: `${asignacion.persona.nombre} ${asignacion.persona.apellido_pat} ${asignacion.persona.apellido_mat}`,
                turno: asignacion.turno
            }))
        }));

        return res.status(200).json({ 
            success: true,
            unidades: resultado 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false,
            message: 'Error al obtener unidades con choferes',
            error: error.message
        });
    }
};