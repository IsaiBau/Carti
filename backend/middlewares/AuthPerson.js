import User from "../models/PersonasModel.js";
import TipoPersonas from "../models/TipoPersonasModel.js"; // Asegúrate de importar TipoPersonas

export const verifyUser = async(req, res, next)=>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Por favor inicia sesión"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        },
        include: [{
            model: TipoPersonas,
            as: 'tipo_persona', 
            attributes: ['nombre'] 
        }]
    });
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});
    req.userId = user.id;
    req.rol = user.tipo_persona.nombre;
    next();
}

export const adminOnly = async(req, res, next)=>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        },
        include: [{
            model: TipoPersonas,
            as: 'tipo_persona', 
            attributes: ['nombre'] 
        }]
    });
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});
    if(user.tipo_persona.nombre !== "admin") return res.status(403).json({msg: "Acceso denegado"});
    next();
}