import { Sequelize, Op } from "sequelize";
import Personas from "../models/PersonasModel.js";
import TipoPersonas from "../models/TipoPersonasModel.js"; 
import argon2 from "argon2";
import ChoferUnidad from "../models/ChoferUnidadModel.js";
import Unidades from "../models/UnidadesModel.js";

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

        const { id_tipo_persona, password, ...otherData } = req.body;

        if (password !== undefined && password !== "") {
            otherData.password = await argon2.hash(password);
        }
        

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
export const getTrabajadoresByDueno = async (req, res) => {
    try {
        const duenoId = req.params.duenoId;// se pasa por URL
        // 1. Obtener IDs de unidades del dueño
        const unidadesIds = (await Unidades.findAll({
            where: { id_personas: duenoId },
            attributes: ['id_unidades']
        })).map(u => u.id_unidades);

        if (!unidadesIds.length) {//por si no hay unidades
            return res.status(200).json({ trabajadores: [] });
        }
        // 2. Obtener choferes con sus unidades (solo datos necesarios)
        const choferes = await Personas.findAll({
            where: { id_tipo_persona: 2 },
            attributes: ['id','uuid', 'nombre', 'apellido_pat', 'apellido_mat', 'sexo', 'fecha_nac', 'curp', 'rfc', 'activo'],
            include: [{
                model: ChoferUnidad,
                required: false,
                where: { id_unidades: { [Op.in]: unidadesIds } },
                attributes: ['id_unidades', 'turno'],
                include: [{
                    model: Unidades,
                    attributes: ['numero', 'placa']
                }]
            }]
        });
        // 3. Formatear respuesta limpia
        const resultado = choferes.map(chofer => ({
            id: chofer.id,
            uuid: chofer.uuid,
            nombre: chofer.nombre,
            apellido_pat: chofer.apellido_pat,
            apellido_mat: chofer.apellido_mat,
            sexo: chofer.sexo,
            fecha_nac: chofer.fecha_nac,
            curp: chofer.curp,
            rfc: chofer.rfc,
            activo: chofer.activo,
            unidades: chofer.chofer_unidads.map(asignacion => ({
                id_unidades: asignacion.id_unidades,
                turno: asignacion.turno,
                numero: asignacion.unidade.numero,
                placa: asignacion.unidade.placa
            }))
        }));
        return res.status(200).json({ trabajadores: resultado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false,
            message: 'Error al obtener trabajadores'
        });
    }
};
export const getAllDuenosTrabajadores = async (req, res) => {
    try {
        // 1. Consulta: Dueños con sus unidades y choferes asignados
        const dueños = await Personas.findAll({
            where: { id_tipo_persona: 3 }, // Filtro para dueños
            attributes: ['id', 'nombre', 'apellido_pat', 'apellido_mat'],
            include: [{
                model: Unidades,
                attributes: ['id_unidades', 'placa', 'numero'],
                include: [{
                    model: ChoferUnidad,
                    attributes: ['id_chofer_unidad', 'turno'],
                    include: [{
                        model: Personas,
                        where: { id_tipo_persona: 2 }, // Filtro para choferes
                        attributes: ['id', 'nombre', 'apellido_pat', 'apellido_mat']
                    }]
                }]
            }]
        });

        // 2. Procesamiento de resultados
        const resultado = dueños.map(dueño => {
            // Objeto para agrupar choferes y sus unidades
            const choferesAgrupados = {};
            
            // Recorrer cada unidad del dueño
            dueño.unidades?.forEach(unidad => {
                // Recorrer cada asignación de chofer a la unidad
                unidad.chofer_unidads?.forEach(asignacion => {
                    if (!asignacion.persona) return;
                    
                    const chofer = asignacion.persona;
                    const choferId = chofer.id;
                    
                    // Inicializar entrada para el chofer si no existe
                    if (!choferesAgrupados[choferId]) {
                        choferesAgrupados[choferId] = {
                            chofer: {
                                id: chofer.id,
                                nombre: chofer.nombre,
                                apellidos: `${chofer.apellido_pat} ${chofer.apellido_mat}`
                            },
                            unidades: []
                        };
                    }
                    
                    // Agregar unidad si no está ya registrada
                    const unidadInfo = {
                        id: unidad.id_unidades,
                        placa: unidad.placa,
                        numero: unidad.numero,
                        turno: asignacion.turno
                    };
                    
                    if (!choferesAgrupados[choferId].unidades.some(u => u.id === unidad.id_unidades)) {
                        choferesAgrupados[choferId].unidades.push(unidadInfo);
                    }
                });
            });
            
            // Estructura final para cada dueño
            return {
                dueño: {
                    id: dueño.id,
                    nombreCompleto: `${dueño.nombre} ${dueño.apellido_pat} ${dueño.apellido_mat}`
                },
                choferes: Object.values(choferesAgrupados)
            };
        });

        // 3. Enviar respuesta
        res.status(200).json({
            success: true,
            totalDueños: resultado.length,
            datos: resultado
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener dueños y sus trabajadores',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// En controllers/PersonasController.js
export const getChoferes = async (req, res) => {
    try {
        const choferes = await Personas.findAll({
            where: {
                id_tipo_persona: 2, // Filtra solo choferes
                activo: true
            },
            attributes: ['id', 'nombre', 'apellido_pat', 'apellido_mat']
        });
        res.status(200).json(choferes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/*Codigo mas corto de la funcion anterior
export const getAllDuenosTrabajadores = async (req, res) => {
    try {
        const dueños = await Personas.findAll({
            where: { id_tipo_persona: 3 },
            attributes: ['id', 'nombre', 'apellido_pat', 'apellido_mat'],
            include: [{
                model: Unidades,
                include: [{
                    model: ChoferUnidad,
                    include: [{
                        model: Personas,
                        where: { id_tipo_persona: 2 }
                    }]
                }]
            }]
        });

        const resultado = dueños.map(dueño => {
            const choferes = {};
            
            dueño.unidades?.forEach(u => u.chofer_unidads?.forEach(cu => {
                if (!cu.persona) return;
                
                const c = cu.persona;
                if (!choferes[c.id]) {
                    choferes[c.id] = {
                        ...c.get({ plain: true }),
                        unidades: []
                    };
                }
                
                if (!choferes[c.id].unidades.some(u2 => u2.id_unidades === u.id_unidades)) {
                    choferes[c.id].unidades.push({
                        id_unidades: u.id_unidades,
                        placa: u.placa,
                        numero: u.numero,
                        turno: cu.turno
                    });
                }
            }));

            return {
                dueño: {
                    id: dueño.id,
                    nombre: `${dueño.nombre} ${dueño.apellido_pat} ${dueño.apellido_mat}`
                },
                choferes: Object.values(choferes)
            };
        });

        res.json({ success: true, data: resultado });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
}; */