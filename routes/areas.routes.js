const { Router } = require('express');
const { validationResult, check, body } = require('express-validator');
const {Area} = require('../model');

const router = Router();

router.get('/',async(req,res)=>{
  const areas = await Area.findAll();
  res.json(areas);
});


router.post('/create',[
    body('nombre_area').notEmpty().withMessage('El campo nombre area es requerido')
            .isLength({min:3})
            .withMessage('El campo nombre area debe contener al menos 3 caracteres'),
],async(req,res)=>{
    const {nombre_area,
            salon,
            edificio,
            responsable,
            horario_entrada,
            horario_salida,
            latitud,
            longitud,
            codigo_qr} = req.body;

            console.log(req.body);

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
        const area = await Area.create({
            nombre_area,
            salon,
            edificio,
            responsable,
            horario_entrada,
            horario_salida,
            latitud,
            longitud,
            codigo_qr
        });
        return res.json({'message':'El visitante se registro con exito!','data':area});
    } catch (error) {
        return res.status(500).json({'code':500,'message':error});
    }

});


router.put('/update',[
    body('nombres').notEmpty().withMessage('El campo nombres es requerido')
            .isLength({min:3})
            .withMessage('El campo nombres debe contener al menos 3 caracteres'),
    body('apellidos').notEmpty().withMessage('El campo apellidos es requerido')
            .isLength({min:3})
            .withMessage('El campo apellidos debe contener al menos 3 caracteres'),
    body('genero').notEmpty().withMessage('El campo genero es requerido'),
    body('telefono').notEmpty().withMessage('El campo telefono es requerido')
            .isLength({min:3})
            .withMessage('El campo telefono debe contener al menos 3 caracteres'),
    check('email','El email no tiene el formato correcto').isEmail(),
    body('motivo_cita').notEmpty().withMessage('El campo motivo cita es requerido'),
],async(req,res)=>{
    const {id_area,nombres,apellidos,genero,telefono,email,motivo_visita} = req.body;

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
        const area = await Area.findByPk(id_area);
            area.nombres = nombres;
            area.apellidos = apellidos;
            area.genero = genero;
            area.telefono = telefono;
            area.email = email;
            area.motivo_visita = motivo_visita;
        await area.save();

        return res.json({'message':'El visitante se registro con exito!','data':area});
    } catch (error) {
        return res.status(500).json({'code':500,'message':error});
    }

});

module.exports = router;