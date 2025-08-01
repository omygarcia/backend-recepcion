const { Router } = require('express');
const { validationResult, check, body } = require('express-validator');
const {Registro, Empleado} = require('../model');
const { validaJWT } = require('../middleware/valida-jwt');

const router = Router();

/**Muentra los registros totales */
router.get('/',async(req,res)=>{
  const registros = await Registro.findAll({
        include: [{ model: Empleado }]
    });
  res.json(registros);
});


router.get('/usuario',[validaJWT],async(req,res)=>{
    const id = req.usuario.id_empleado;
    const registros = await Registro.findAll({
        where:{id_empleado:id},
    });
  res.json(registros);
});

router.post('/registrar-entrada',[
    validaJWT,
    body('codigo_qr').notEmpty().withMessage('El campo codigo_qr es requerido'),
],async(req,res)=>{
    const {codigo_qr} = req.body;

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
        const date = new Date();
        const fecha_cita = date.getFullYear()+"/"+date.getMonth().toString().padStart(2,'0')+'/'+date.getDay().toString().padStart(2,'0');
        const hora_registro = date.getHours().toString().padStart(2,'0')+":"+date.getMinutes().toString().padStart(2,'0');
        const id_empleado = req.usuario.id_empleado;
        const id_visitante = 1;

        const hora_ingreso = hora_registro;
        const hora_salida = null;
        const id_area = 1;

        const [registro, created] = await Registro.findOrCreate({
            where:{id_empleado:id_empleado,fecha_cita:fecha_cita},
            defaults:{
                fecha_cita,
                hora_ingreso,
                hora_salida,
                id_visitante,
                id_empleado,
                id_area
            }
        });

        if(created == false){
            registro.hora_salida = hora_registro;
            await registro.save();
        }

        /*const registro = await Registro.create({
            fecha_cita,
            hora_ingreso,
            hora_salida,
            id_visitante,
            id_empleado,
            id_area
        });*/
        return res.json({'message':'Acceso correcto!','data':registro});
    } catch (error) {
        console.log(error);
        return res.status(500).json({'code':500,'message':error});
    }

});

module.exports = router;