const { Router } = require('express');
const { validationResult, check, body } = require('express-validator');
const {Registro} = require('../model');

const router = Router();

router.get('/',async(req,res)=>{
  const registros = await Registro.findAll();
  res.json(registros);
});


router.post('/create',[
    body('fecha_cita').notEmpty().withMessage('El campo fecha_cita es requerido'),
    body('hora_ingreso').notEmpty().withMessage('El campo hora_ingreso es requerido'),
    body('id_area').notEmpty().withMessage('El campo id_area es requerido')
],async(req,res)=>{
    const {fecha_cita,hora_ingreso,hora_salida,id_visitante,id_empleado,id_area} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.json({
            code:'401',
            message:'Error al formar la consulta, revise el formato de los campos',
            errors:errors.array()
        });
    }

    try {
        const registro = await Registro.create({
            fecha_cita,
            hora_ingreso,
            hora_salida,
            id_visitante,
            id_empleado,
            id_area
        });
        return res.json({'message':'Acceso correcto!','data':registro});
    } catch (error) {
        return res.status(500).json({'code':500,'message':error});
    }

});

module.exports = router;