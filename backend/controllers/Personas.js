import { Sequelize, Op } from "sequelize";
import Personas from "../models/PersonasModel.js";

export const getPersonas = async(req, res) => {
    try {
        const response = await Personas.findAll({
            attributes:['uuid','nombre', 'apellido_pat', 'apellido_mat', 'fecha_nac', 'curp', 'rfc', 'sexo', 'id_tipo_persona', 'activo'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPersonasById = async(req, res) => {
    try {
        const persona = await Personas.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!persona) return res.status(404).json({msg: "No se encontró la persona"});
        const response = await Personas.findOne({
            attributes:['uuid','nombre', 'apellido_pat', 'apellido_mat', 'fecha_nac', 'curp', 'rfc', 'sexo', 'id_tipo_persona', 'activo'],
            where:{
                id: persona.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createPersonas = async(req, res) => {
    const { nombre, apellido_pat, apellido_mat, fecha_nac, curp, rfc, sexo, id_tipo_persona, activo } = req.body;
    try {
        await Personas.create({
            nombre: nombre,
            apellido_pat: apellido_pat,
            apellido_mat: apellido_mat,
            fecha_nac: fecha_nac,
            curp: curp,
            rfc: rfc,
            sexo: sexo,
            id_tipo_persona: id_tipo_persona,
            activo: activo
        });
        res.status(200).json({msg: "Persona agregada exitosamente!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatePersonas = async (req, res) => {
    try {
        const persona = await Personas.findOne({
            where: {
                uuid: req.params.id
            }
        });
        const { nombre, apellido_pat, apellido_mat, fecha_nac, curp, rfc, sexo, id_tipo_persona, activo } = req.body;
        if(!persona) return res.status(404).json({msg: "No se encontró la persona"});
        await Personas.update({nombre, apellido_pat, apellido_mat, fecha_nac, curp, rfc, sexo, id_tipo_persona, activo},{
            where:{
                id: persona.id
            }
        });
        res.status(200).json({ msg: "Persona actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deletePersonas = async(req, res) => {
    try {
        const persona = await Personas.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!persona) return res.status(404).json({msg: "No se encontró la persona"});
        await Personas.destroy({
            where:{
                id: persona.id
            }
        });
        res.status(200).json({msg: "Persona eliminada con éxito!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
