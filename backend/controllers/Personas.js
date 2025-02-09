import User from "../models/UserModel.js";
import Trabajador from "../models/TrabajadorModel.js";
import Personas from "../models/PersonasModel.js";
import TipoPersonas from "../models/TipoPersonasModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) => {
    try {
        const response = await Personas.findAll({
            attributes: ['uuid', 'id_tipo_persona','nombre', 'apellido_pat', 'apellido_mat', 'sexo', 'fecha_nac','curp','rfc','activo'],
            include: [{
                model: TipoPersonas,
                attributes:['uuid','nombre', 'descripcion', 'activo']
            }]
        });
        res.status(200).json(response) 
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await Personas.findOne({
            where:{
                uuid: req.params.id
            },
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
/*
export const createUser = async(req, res) => {
    const {id_tipo_persona,nombre, apellido_pat, apellido_mat, sexo, fecha_nac, curp,rfc,activo} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Las contraseñas no coinciden"})
    const hashPassword = await argon2.hash(password);
    try {
        const trabajador = await Trabajador.findOne({ where: { uuid: trabajadorId } });
        if (!trabajador) {
            return res.status(400).json({ msg: "El trabajador no existe" });
        }
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            trabajadorId: trabajador.id
        });
        res.status(201).json({msg: "Registro Exitoso!"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado!" });

    const { name, email, password, confPassword, role, trabajadorId } = req.body;

    // Validación de contraseñas
    if (password !== confPassword) return res.status(400).json({ msg: "Las contraseñas no coinciden" });

    let hashPassword;
    if (password === "" || password === null || password === undefined) {
        hashPassword = user.password;
    } else {
        hashPassword = await argon2.hash(password);
    }

    try {
        const trabajador = await Trabajador.findOne({ where: { uuid: trabajadorId } });
        if (!trabajador) {
            return res.status(400).json({ msg: "El trabajador no existe" });
        }

        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            trabajadorId: trabajador.id
        }, {
            where: {
                uuid: req.params.id
            }
        });

        res.status(201).json({ msg: "Usuario actualizado!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteUser = async(req, res) => {
    const user = await User.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario a"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(201).json({msg: "Usuario eliminado!"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
    
}*/