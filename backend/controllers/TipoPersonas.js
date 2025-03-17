
import { Sequelize, Op } from "sequelize";
import TipoPersonas from "../models/TipoPersonasModel.js";

export const getTipoPersonas = async(req, res) => {
    try {
        let response;
        response = await TipoPersonas.findAll({
            attributes:['id_tipo_persona','uuid','nombre', 'descripcion', 'activo'],
        });
        res.status(200).json(response);
        //console.log(response) esto es para testear y mostrar en la consola
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTipoPersonasById = async(req, res) => {
    try {
        const tp = await TipoPersonas.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!tp) return res.status(404).json({msg: "No se encontró el tipo de persona"});
        let response;
        if(req.role === "Administrador" || req.role === "Conductor"){
            response = await TipoPersonas.findOne({
                attributes:['uuid','nombre'],
                where:{
                    id: tp.id
                }
            });
        } else {
            response = await TipoPersonas.findOne({
                attributes:['nombre', 'descripcion', 'activo'],
                where:{
                    [Op.and]:[{id: tp.id}]
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createTipoPersonas = async(req, res) => {
    const {nombre, descripcion, activo} = req.body;
    try {
        await TipoPersonas.create({
            nombre: nombre,
            descripcion: descripcion,
            activo: activo
        });
        res.status(200).json({msg: "Tipo de persona agregada exitosamente!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateTipoPersonas = async (req, res) => {
    try {
        const tp = await TipoPersonas.findOne({
            where: {
                uuid: req.params.id
            }
        });
        const { nombre,descripcion, activo } = req.body;
        if(!tp) return res.status(404).json({msg: "No se encontró el tipo de persona"});
        if(req.role === "Administrador" || req.role === "Conductor"){
            await TipoPersonas.update({nombre,descripcion,activo},{
                where:{
                    id_tipo_persona: tp.id_tipo_persona
                }
            });
        } else {
            /*if(req.userId !== tp.userId) return res.status(403).json({msg: "Acceso prohibido"});*/
            await TipoPersonas.update({nombre,descripcion,activo},{
                where:{
                    id_tipo_persona: tp.id_tipo_persona
                },
            });
        }
        res.status(200).json({ msg: "Tipo de persona actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteTipoPersonas = async(req, res) => {
    try {
        const tp = await TipoPersonas.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!tp) return res.status(404).json({msg: "No se encontró el tipo de persona"});
        
        // Eliminación sin considerar roles
        await TipoPersonas.destroy({
            where:{
                uuid: req.params.id
            }
        });

        res.status(200).json({msg: "Tipo de persona eliminada con éxito!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
