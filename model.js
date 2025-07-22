const {sequelize} = require('./db');
const {DataTypes} = require('@sequelize/core');

const Empleado = sequelize.define('Empleado', {
  id_empleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombres: DataTypes.STRING,
  apellidos: DataTypes.STRING,
  cargo: DataTypes.STRING,
  departamento: DataTypes.STRING,
  email: DataTypes.STRING,
}, {
  tableName: 'empleado',
  schema: 'public', // ← define el esquema aquí
  timestamps: false, // ← si no usas createdAt/updatedAt
});

const Visitante = sequelize.define('Visitante', {
  id_visitante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
   id_tipovisitante: {
    type: DataTypes.INTEGER,
  },
  nombres: DataTypes.STRING,
  apellidos: DataTypes.STRING,
  genero: DataTypes.STRING,
  telefono: DataTypes.STRING,
  email: DataTypes.STRING,
  motivo_visita: DataTypes.STRING,
}, {
  tableName: 'visitante',
  schema: 'public', // ← define el esquema aquí
  timestamps: false, // ← si no usas createdAt/updatedAt
});

const Registro = sequelize.define('Registro', {
  id_registro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
   id_tipovisitante: {
    type: DataTypes.INTEGER,
  },
  hora_ingreso: DataTypes.STRING,
  apellidos: DataTypes.STRING,
  genero: DataTypes.STRING,
  telefono: DataTypes.STRING,
  email: DataTypes.STRING,
  motivo_visita: DataTypes.STRING,
}, {
  tableName: 'registro',
  schema: 'public', // ← define el esquema aquí
  timestamps: false, // ← si no usas createdAt/updatedAt
});

module.exports = {
    Empleado,
    Visitante
}