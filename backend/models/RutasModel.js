import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Paradas from './ParadasModel.js';
import Viajes from './ViajesModel.js';

const Rutas = db.define('rutas', {
    id_rutas: {
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
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    origen: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    destino: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });

// Relación entre `Paradas` y `Rutas`
Rutas.hasMany(Paradas, { foreignKey: 'id_rutas' });
Paradas.belongsTo(Rutas, { foreignKey: 'id_rutas'});
// Relación entre `viajes` y `Rutas`
Rutas.hasMany(Viajes, { foreignKey: 'id_rutas' });
Viajes.belongsTo(Rutas, { foreignKey: 'id_rutas'});
export default Rutas;