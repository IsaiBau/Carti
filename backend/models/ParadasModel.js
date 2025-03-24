import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import RegistroLlegadas from './RegistroLlegadasModel.js';
const Paradas = db.define('paradas', {
    id_paradas: {
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
    id_rutas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true, // Asegura que el campo no esté vacío
        },
    },
    ubicacion: {
        type: DataTypes.STRING(255),
        allowNull: true, // Esto puede ser opcional si lo prefieres
    },
    latitud: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true, // Coordenada opcional
    },
    longitud: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true, // Coordenada opcional
    },
}, {
    timestamps: false,
    freezeTableName: true, // Previene pluralización del nombre de la tabla
});
Paradas.hasMany(RegistroLlegadas, { foreignKey: 'id_paradas', onDelete: 'NO ACTION' });
RegistroLlegadas.belongsTo(Paradas, { foreignKey: 'id_paradas', onDelete: 'NO ACTION'});

export default Paradas;