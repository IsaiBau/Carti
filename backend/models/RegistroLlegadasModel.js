import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const RegistroLlegadas = db.define('registro_llegadas', {
    id_registro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid:{
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
          notEmpty: true,
      }
    },
    id_paradas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_personas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_viajes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_llegada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pasajeros: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

export default RegistroLlegadas;