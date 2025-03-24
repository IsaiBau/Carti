import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import ChoferUnidad from './ChoferUnidadModel.js';
const Unidades = db.define('unidades', {
    id_unidades: {
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
        },
    },
    id_personas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    placa: {
        type: DataTypes.STRING(7),
        allowNull: false,
        validate: {
            notEmpty: true, // Asegura que el campo no esté vacío
        },
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    }
}, {
    timestamps: false,
    freezeTableName: true, // Previene pluralización del nombre de la tabla
});
Unidades.hasMany(ChoferUnidad, { foreignKey: 'id_unidades',onDelete: 'NO ACTION' });
ChoferUnidad.belongsTo(Unidades, { foreignKey: 'id_unidades',onDelete: 'NO ACTION' });
export default Unidades;