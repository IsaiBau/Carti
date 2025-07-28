import { Sequelize, Op } from "sequelize";
import Personas from "../models/PersonasModel.js";
import TipoPersonas from "../models/TipoPersonasModel.js";
import argon2 from "argon2";
import admin from 'firebase-admin';

// Configura Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Mapeo de tipos de persona a roles
const TIPO_A_ROL = {
  1: 'admin',
  2: 'conductor',
  3: 'dueño',
  4: 'checador'
};

export const login = async (req, res) => {
  try {
    const { rfc, password } = req.body;
    
    // Buscar usuario por RFC
    const persona = await Personas.findOne({
      where: { rfc },
      include: [{
        model: TipoPersonas,
        attributes: ['nombre']
      }]
    });

    if (!persona) {
      return res.status(404).json({ 
        success: false,
        message: "Usuario no encontrado" 
      });
    }

    // Verificar contraseña
    const passwordMatch = await argon2.verify(persona.password, password);
    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Contraseña incorrecta" 
      });
    }

    // Verificar si está activo
    if (!persona.activo) {
      return res.status(403).json({ 
        success: false,
        message: "Cuenta desactivada" 
      });
    }

    // Crear sesión
    req.session.userId = persona.id;

    res.json({
      success: true,
      user: {
        id: persona.id,
        uuid: persona.uuid,
        nombre: persona.nombre,
        apellido_pat: persona.apellido_pat,
        apellido_mat: persona.apellido_mat,
        rfc: persona.rfc,
        email: persona.email,
        rol: TIPO_A_ROL[persona.id_tipo_persona] || 'usuario'
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ 
      success: false,
      message: "Error en el servidor" 
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verificar token con Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, uid, name } = decodedToken;

    // Buscar usuario por email o crear uno nuevo
    let persona = await Personas.findOne({ 
      where: { email },
      include: [{
        model: TipoPersonas,
        attributes: ['nombre']
      }]
    });

    if (!persona) {
      // Crear nuevo usuario si no existe
      const [nombre, apellido_pat, apellido_mat] = (name || 'Usuario Google').split(' ');
      
      persona = await Personas.create({
        nombre: nombre || 'Google',
        apellido_pat: apellido_pat || 'User',
        apellido_mat: apellido_mat || '',
        email,
        uid,
        rfc: 'G' + uid.substring(0, 12), // RFC temporal
        password: await argon2.hash(uid), // Contraseña segura basada en UID
        id_tipo_persona: 3, // Dueño por defecto
        activo: true
      });
    }

    // Verificar si está activo
    if (!persona.activo) {
      return res.status(403).json({ 
        success: false,
        message: "Cuenta desactivada" 
      });
    }

    // Crear sesión
    req.session.userId = persona.id;

    res.json({
      success: true,
      user: {
        id: persona.id,
        uuid: persona.uuid,
        nombre: persona.nombre,
        apellido_pat: persona.apellido_pat,
        apellido_mat: persona.apellido_mat,
        rfc: persona.rfc,
        email: persona.email,
        rol: TIPO_A_ROL[persona.id_tipo_persona] || 'usuario'
      }
    });

  } catch (error) {
    console.error("Error en Google Auth:", error);
    res.status(500).json({ 
      success: false,
      message: "Error en autenticación con Google" 
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ 
        success: false,
        message: "No autenticado" 
      });
    }

    const persona = await Personas.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [{
        model: TipoPersonas,
        attributes: ['nombre']
      }]
    });

    if (!persona) {
      return res.status(404).json({ 
        success: false,
        message: "Usuario no encontrado" 
      });
    }

    res.json({
      success: true,
      user: {
        id: persona.id,
        uuid: persona.uuid,
        nombre: persona.nombre,
        apellido_pat: persona.apellido_pat,
        apellido_mat: persona.apellido_mat,
        rfc: persona.rfc,
        email: persona.email,
        rol: TIPO_A_ROL[persona.id_tipo_persona] || 'usuario'
      }
    });

  } catch (error) {
    console.error("Error verificando autenticación:", error);
    res.status(500).json({ 
      success: false,
      message: "Error en el servidor" 
    });
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
        return res.status(500).json({ 
          success: false,
          message: "Error al cerrar sesión" 
        });
      }
      
      res.clearCookie('connect.sid');
      res.json({ 
        success: true,
        message: "Sesión cerrada correctamente" 
      });
    });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ 
      success: false,
      message: "Error en el servidor" 
    });
  }
};