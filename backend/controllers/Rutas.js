
import { Sequelize, Op } from "sequelize";
import Rutas from "../models/RutasModel.js"
import ChoferUnidad from "../models/ChoferUnidadModel.js"
import Unidades from "../models/UnidadesModel.js";
import Viajes from "../models/ViajesModel.js";
export const getRutas = async(req, res) => {
    try {
        let response;
        response = await Rutas.findAll({
            attributes:['id_rutas','uuid','nombre', 'origen','destino'],
        });
        res.status(200).json(response);
        //console.log(response) esto es para testear y mostrar en la consola
    } catch (error) {
        res.status(500).json(error);
    }
}

// Obtener unidades asignadas a un chofer
// Ruta: GET /unidades-chofer/:id_chofer
export const getUnidadesChofer = async(req, res) => {
    const { id_chofer } = req.params;
    
    try {
        const relaciones = await ChoferUnidad.findAll({
            where: { id_personas: id_chofer },
            include: [{
                model: Unidades,
                required: true
            }]
        });
        
        // Formatear la respuesta correctamente
        const unidades = relaciones.map(rel => ({
            id_unidades: rel.unidade.id_unidades,
            uuid: rel.unidade.uuid,
            numero: rel.unidade.numero,
            placa: rel.unidade.placa,
            turno: rel.turno // Si necesitas el turno también
        }));
        
        res.status(200).json(unidades);
    } catch (error) {
        console.error('Error en getUnidadesChofer:', error);
        res.status(500).json({msg: error.message});
    }
}

// Obtener relación chofer-unidad
export const getChoferUnidad = async(req, res) => {
    const { id_chofer, id_unidad } = req.params;
    
    try {
        const choferUnidad = await ChoferUnidad.findOne({
            where: { 
                id_personas: id_chofer,
                id_unidades: id_unidad 
            }
        });
        
        if (!choferUnidad) {
            return res.status(404).json({msg: "No existe esta relación chofer-unidad"});
        }
        
        res.status(200).json(choferUnidad);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// Obtener viaje activo de un chofer
export const getViajeActivoChofer = async(req, res) => {
    const { id_chofer } = req.params;
    
    try {
        const viaje = await Viajes.findOne({
            where: { fecha_fin: null },
            include: [{
                model: ChoferUnidad,
                required: true,
                where: { id_personas: id_chofer },
                include: [{
                    model: Unidades,
                    attributes: ['numero', 'placa']
                }]
            }]
        });
        
        if (!viaje) {
            return res.status(404).json({msg: "No hay viaje activo"});
        }
        
        res.status(200).json(viaje);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// Iniciar un nuevo viaje
export const iniciarViaje = async(req, res) => {
    const { id_rutas, id_chofer_unidad } = req.body;
    const fecha_inicio = new Date();
    
    try {
        // Verificar si ya tiene un viaje activo
        const viajeActivo = await Viajes.findOne({
            where: { fecha_fin: null },
            include: [{
                model: ChoferUnidad,
                required: true,
                where: { id_chofer_unidad }
            }]
        });
        
        if (viajeActivo) {
            return res.status(400).json({msg: "Ya tienes un viaje activo"});
        }
        
        const nuevoViaje = await Viajes.create({
            id_rutas,
            id_chofer_unidad,
            fecha_inicio,
            fecha_fin: null
        });
        
        res.status(201).json(nuevoViaje);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// Finalizar un viaje
export const finalizarViaje = async(req, res) => {
    const { id_viaje } = req.params;
    const fecha_fin = new Date();
    
    try {
        const viaje = await Viajes.findByPk(id_viaje);
        
        if (!viaje) {
            return res.status(404).json({msg: "Viaje no encontrado"});
        }
        
        if (viaje.fecha_fin) {
            return res.status(400).json({msg: "Este viaje ya fue finalizado"});
        }
        
        viaje.fecha_fin = fecha_fin;
        await viaje.save();
        
        res.status(200).json({msg: "Viaje finalizado correctamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}