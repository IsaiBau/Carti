import { request } from "express";
import User from "../models/PersonasModel.js";
import TipoPersonas from "../models/TipoPersonasModel.js";
import argon2 from "argon2";

export const Login = async(req, res) =>{
    const user = await User.findOne({
        where: {
            rfc: req.body.rfc 
        },
        include: [{
            model: TipoPersonas,
            as: 'tipo_persona', 
            attributes: ['nombre'] 
        }]
    });
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});
    
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Contraseña incorrecta" });

    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const id = user.id;
    const nombre = user.nombre;
    const rfc = user.rfc;
    const rol = user.tipo_persona.nombre;
    res.status(200).json({id, uuid, nombre, rfc, rol});
}

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Por favor inicia sesión" });
    }

    const user = await User.findOne({
        attributes: ['id', 'uuid', 'nombre', 'rfc'],
        where: {
            uuid: req.session.userId
        },
        include: [{
            model: TipoPersonas,
            as: 'tipo_persona', 
            attributes: ['nombre'] 
        }]
    });

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const { id, uuid, nombre, rfc } = user;
    const rol = user.tipo_persona.nombre; 
    res.status(200).json({ id, uuid, nombre, rfc, rol });
};
export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "No se pudo cerrrar sesión"})
        res.status(200).json({msg: "Se ha cerrado sesión!"})
    })
}   