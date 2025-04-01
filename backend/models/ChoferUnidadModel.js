import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Finanzas from './FinanzasModel.js';
import Viajes from './ViajesModel.js';

const ChoferUnidad = db.define('chofer_unidad', {
    id_chofer_unidad: {
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
    id_personas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_unidades: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    turno: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });
ChoferUnidad.hasMany(Finanzas, { foreignKey: 'id_chofer_unidad' });
Finanzas.belongsTo(ChoferUnidad, { foreignKey: 'id_chofer_unidad' });

ChoferUnidad.hasMany(Viajes, { foreignKey: 'id_chofer_unidad' });
Viajes.belongsTo(ChoferUnidad, { foreignKey: 'id_chofer_unidad' });
export default ChoferUnidad;