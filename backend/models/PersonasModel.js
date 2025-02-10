import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

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
    activo: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

export default Personas;
