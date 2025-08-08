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
  rol:DataTypes.STRING,
  password:DataTypes.STRING
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

const TipoVisitante = sequelize.define('TipoVisitante', {
  id_tipovisitante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo_visitante: DataTypes.STRING,
  organizacion: DataTypes.STRING,
}, {
  tableName: 'tipo_visitante',
  schema: 'public', // ← define el esquema aquí
  timestamps: false, // ← si no usas createdAt/updatedAt
});


const Registro = sequelize.define('Registro', {
  id_registro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
   fecha_cita: {
    type: DataTypes.DATE,
  },
  hora_ingreso: DataTypes.TIME,
  hora_salida: DataTypes.TIME,
  id_visitante: DataTypes.INTEGER,
  id_empleado: DataTypes.INTEGER,
  id_area: DataTypes.INTEGER,
}, {
  tableName: 'registro',
  schema: 'public', // ← define el esquema aquí
  timestamps: false, // ← si no usas createdAt/updatedAt
});

Registro.belongsTo(Empleado,{
  foreignKey:'id_empleado'
});

const Area = sequelize.define('Area', {
  id_area: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
   nombre_area: {
    type: DataTypes.STRING,
  },
  salon: DataTypes.STRING,
  edificio: DataTypes.STRING,
  responsable: DataTypes.STRING,
  horario_entrada: DataTypes.TIME,
  horario_salida: DataTypes.TIME,
  latitud: DataTypes.STRING,
  longitud: DataTypes.STRING,
  codigo_qr: DataTypes.STRING,
}, {
  tableName: 'area',
  schema: 'public', // ← define el esquema aquí
  timestamps: false, // ← si no usas createdAt/updatedAt
});

const Cita = sequelize.define('Cita', {
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: DataTypes.DATE,
  motivo_cita: DataTypes.STRING,
  comentarios: DataTypes.STRING,
  seguimiento: DataTypes.STRING,
  horario_salida: DataTypes.TIME,
  latitud: DataTypes.STRING,
  longitud: DataTypes.STRING,
  codigo_qr: DataTypes.STRING,
}, {
  tableName: 'citas',
  schema: 'public', // ← define el esquema aquí
  timestamps: false, // ← si no usas createdAt/updatedAt
});

module.exports = {
    Empleado,
    Visitante,
    Registro,
    Area,
    Cita,
    TipoVisitante
}