import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import ChoferUnidad from './ChoferUnidadModel.js';
import RegistroLlegadas from './RegistroLlegadasModel.js';
import Unidades from './UnidadesModel.js';

const Personas = db.define('personas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    id_tipo_persona: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido_pat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido_mat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sexo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    fecha_nac: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    curp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rfc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    activo: {
        type: DataTypes.BOOLEAN,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

Personas.hasMany(ChoferUnidad, { foreignKey: 'id_personas' });
ChoferUnidad.belongsTo(Personas, { foreignKey: 'id_personas' });
Personas.hasMany(Unidades, { foreignKey: 'id_personas' });
Unidades.belongsTo(Personas, { foreignKey: 'id_personas' });
Personas.hasMany(RegistroLlegadas, { foreignKey: 'id_personas', onDelete: 'NO ACTION'});
RegistroLlegadas.belongsTo(Personas, { foreignKey: 'id_personas', onDelete: 'NO ACTION' });

export default Personas;