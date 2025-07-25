require('dotenv').config();
const express = require('express');
const {sequelize} = require('./db');
const {Empleado, Visitante} = require('./model');
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


app.get('/visitante/',async(req,res)=>{
  const visitantes = await Visitante.findAll();
  res.json(visitantes);
});

app.use('/auth',require('./routes/auth.routes'));

app.listen(PORT, () => {
  console.log(`Servidor Node corriendo en http://localhost:${PORT}`);
});
