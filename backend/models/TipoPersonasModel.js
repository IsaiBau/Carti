import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Personas from "../models/PersonasModel.js";

const TipoPersonas = db.define('tipo_personas', {
    id_tipo_persona: {
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
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  Personas.belongsTo(TipoPersonas, { foreignKey: 'id_tipo_persona',onDelete: 'NO ACTION' });
  TipoPersonas.hasMany(Personas, { foreignKey: 'id_tipo_persona',onDelete: 'NO ACTION' });

export default TipoPersonas;