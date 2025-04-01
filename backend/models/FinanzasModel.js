import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Finanzas = db.define('finanzas', {
    id_finanzas: {
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
    id_chofer_unidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    monto:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    cantidad:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });

export default Finanzas;