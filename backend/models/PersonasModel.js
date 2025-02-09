import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import TipoPersonas from './TipoPersonasModel.js';

const Personas = db.define('personas', {
    id: {
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
    id_tipo_persona: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido_pat: {
      type: DataTypes.STRING(20),
    },
    apellido_mat: {
      type: DataTypes.STRING(20),
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
      type: DataTypes.STRING(18),
      allowNull: false,
    },
    rfc: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  
Personas.belongsTo(TipoPersonas, { foreignKey: 'id_tipo_persona' });
TipoPersonas.hasMany(Personas, { foreignKey: 'id_tipo_persona' });
export default Personas;