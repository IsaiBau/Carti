import { Sequelize, Op } from "sequelize";
import Personas from "../models/PersonasModel.js";
import TipoPersonas from "../models/TipoPersonasModel.js"; 
import argon2 from "argon2";

export const getPersonas = async (req, res) => {
    try {
        const response = await Personas.findAll({
            attributes: ['id','uuid', 'id_tipo_persona','nombre', 'apellido_pat', 'apellido_mat', 'sexo', 'fecha_nac','curp','rfc','password','activo'],
            include: [{
                model: TipoPersonas,
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" });
    }
}

export const getPersonasById = async (req, res) => {
    try {
        const persona = await Personas.findOne({
            where: { uuid: req.params.id },
            include: [{ 
                model:TipoPersonas, 
                attributes: ['nombre'] 
            }]
        });

        if (!persona) return res.status(404).json({ msg: "No se encontró la persona" });

        res.status(200).json(persona);
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" });
    }
}

export const createPersonas = async (req, res) => {
    const { nombre, apellido_pat, apellido_mat, fecha_nac, curp, rfc, sexo, id_tipo_persona,password, activo } = req.body;

    try {
        const tipoPersona = await TipoPersonas.findByPk(id_tipo_persona);
        if (!tipoPersona) return res.status(400).json({ msg: "El tipo de persona no existe" });
        const hashedPassword = await argon2.hash(password);
        await Personas.create({
            nombre,
            apellido_pat,
            apellido_mat,
            fecha_nac,
            curp,
            rfc,
            sexo,
            id_tipo_persona,
            password:hashedPassword,
            activo
        });

        res.status(200).json({ msg: "Persona agregada exitosamente!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updatePersonas = async (req, res) => {
    try {
        const persona = await Personas.findOne({ where: { uuid: req.params.id } });

        if (!persona) return res.status(404).json({ msg: "No se encontró la persona" });

        const { id_tipo_persona, ...otherData } = req.body;

        
        if (id_tipo_persona) {
            const tipoPersona = await TipoPersonas.findByPk(id_tipo_persona);
            if (!tipoPersona) return res.status(400).json({ msg: "El tipo de persona no existe" });
        }

        await Personas.update({ id_tipo_persona, ...otherData }, { where: { id: persona.id } });

        res.status(200).json({ msg: "Persona actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deletePersonas = async (req, res) => {
    try {
        const persona = await Personas.findOne({ where: { uuid: req.params.id } });

        if (!persona) return res.status(404).json({ msg: "No se encontró la persona" });

        await Personas.destroy({ where: { id: persona.id } });

        res.status(200).json({ msg: "Persona eliminada con éxito!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
