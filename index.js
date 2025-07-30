require('dotenv').config();
const express = require('express');
const {sequelize} = require('./db');
const {Empleado} = require('./model');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

sequelize.sync().then(()=>'Base de datos syncronizada');

// Hello world
app.get('/', async(req, res) => {
  //res.send('API funcionando 🎉');
  const empleados = await Empleado.findAll();
  res.json(empleados);

});


app.use('/empleado',require('./routes/empleado.router'));
app.use('/visitante/',require('./routes/visitante.routes'));
app.use('/registro/',require('./routes/registro.routes'));
app.use('/areas/',require('./routes/areas.routes'));
app.use('/auth',require('./routes/auth.routes'));
app.use('/reportes',require('./routes/reportes.routes'));

app.listen(PORT, () => {
  console.log(`Servidor Node corriendo en http://localhost:${PORT}`);
});
