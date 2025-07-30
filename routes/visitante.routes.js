const { Router } = require('express');
const { validationResult, check, body } = require('express-validator');
const {Visitante} = require('../model');

const router = Router();

router.get('/',async(req,res)=>{
  const visitantes = await Visitante.findAll();
  res.json(visitantes);
});


router.post('/create',[
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
    const {nombres,apellidos,genero,telefono,email,motivo_visita} = req.body;

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
        const visitante = await Visitante.create({
            nombres,
            apellidos,
            genero,
            telefono,
            email,
            motivo_visita
        });
        return res.json({'message':'El visitante se registro con exito!','data':visitante});
    } catch (error) {
        return res.status(500).json({'code':500,'message':error});
    }

});

module.exports = router;