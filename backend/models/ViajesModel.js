import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import RegistroLlegadas from './RegistroLlegadasModel.js';
const Viajes = db.define('viajes', {
    id_viajes: {
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
    id_rutas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_chofer_unidad: {
        type: DataTypes.INTEGER,
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
  }, {
    timestamps: false,
    freezeTableName: true,
  });

Viajes.hasMany(RegistroLlegadas, { foreignKey: 'id_viajes' });
RegistroLlegadas.belongsTo(Viajes, { foreignKey: 'id_viajes'});

export default Viajes;