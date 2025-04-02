
import { Sequelize, Op } from "sequelize";
import Paradas from "../models/ParadasModel.js"
import RegistroLlegadas from "../models/RegistroLlegadasModel.js";
import Viajes from "../models/ViajesModel.js";
import Unidades from "../models/UnidadesModel.js";
import ChoferUnidad from "../models/ChoferUnidadModel.js";
import Rutas from "../models/RutasModel.js"
export const getParadas = async(req, res) => {
    try {
        let response;
        response = await Paradas.findAll({
            attributes:['id_paradas','uuid','nombre'],
        });
        res.status(200).json(response);
        //console.log(response) esto es para testear y mostrar en la consola
    } catch (error) {
        res.status(500).json(error);
    }
}
export const getParadasRegistradas = async(req, res) => {
    const { id_viajes } = req.params;
    
    try {
        const registros = await RegistroLlegadas.findAll({
            where: { id_viajes },
            attributes: ['id_paradas'],
            group: ['id_paradas']
        });
        
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createRegistroCombi = async(req, res) => {
    const {id_paradas, id_personas, id_unidad, pasajeros} = req.body;
    const fecha_llegada = new Date();
    
    try {

        // 1. Buscar el viaje activo para la unidad (donde fecha_fin es null)
        const viajeActivo = await Viajes.findOne({
            where: {
                id_chofer_unidad: id_unidad,
                fecha_fin: null
            }
        });

        if (!viajeActivo) {
            return res.status(400).json({msg: "No hay un viaje activo para esta unidad"});
        }
        // Verificar si ya existe un registro para esta parada en el viaje
        const registroExistente = await RegistroLlegadas.findOne({
            where: {
                id_viajes: viajeActivo.id_viajes,
                id_paradas: id_paradas
            }
        });

        if (registroExistente) {
            return res.status(400).json({
                msg: `Ya existe un registro para esta parada en el viaje ${viajeActivo.id_viajes}`
            });
        }
        // 2. Crear el registro de llegada asociado al viaje activo
        await RegistroLlegadas.create({
            id_paradas: id_paradas,
            id_personas: id_personas,
            id_viajes: viajeActivo.id_viajes,
            fecha_llegada: fecha_llegada,
            pasajeros: pasajeros
        });

        res.status(200).json({msg: "Registro de llegada agregado exitosamente!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getViajeActivo = async(req, res) => {
    const {id_unidad} = req.params;
    
    try {
        const viaje = await Viajes.findOne({
            where: {
                fecha_fin: null
            },
            include: [{
                model: ChoferUnidad,
                required: true,
                where: { id_unidades: id_unidad }, // Cambiado a id_unidades
                include: [{
                    model: Unidades,
                    attributes: ['numero', 'placa']
                }]
            }]
        });

        if (!viaje) {
            return res.status(404).json({msg: "No hay viaje activo para esta unidad"});
        }

        res.status(200).json(viaje);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getParadasByRuta = async (req, res) => {
    const { id_ruta } = req.params;

    try {
        const paradas = await Paradas.findAll({
            where: { id_rutas: id_ruta } // Filtras directamente por la relación sin incluir el atributo 'orden'.
        });

        res.status(200).json(paradas);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
