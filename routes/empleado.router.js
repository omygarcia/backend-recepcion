const { Router } = require('express');
const { validationResult, check, body } = require('express-validator');
const {Empleado} = require('../model');

const router = Router();

router.get('/',async(req,res)=>{
  const empleados = await Empleado.findAll();
  res.json(empleados);
});


router.post('/create',[
    check('email','El email no tiene el formato correcto').isEmail(),
    body('nombres').notEmpty().withMessage('El campo nombres es requerido')
            .isLength({min:3})
            .withMessage('El campo nombres debe contener al menos 3 caracteres'),
    body('cargo').notEmpty().withMessage('El campo cargo es requerido')
            .isLength({min:3})
            .withMessage('El campo cargo debe contener al menos 3 caracteres'),
    body('departamento').notEmpty().withMessage('El campo departamento es requerido')
            .isLength({min:3})
            .withMessage('El campo departamento debe contener al menos 3 caracteres')
],async(req,res)=>{
    const {nombres,apellidos,cargo,departamento,email} = req.body;

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
        const empleado = await Empleado.create({
            nombres,
            apellidos,
            cargo,
            departamento,
            email
        });
        return res.json({'message':'El empleado se registro con exito!','data':empleado});
    } catch (error) {
        return res.status(500).json({'code':500,'message':error});
    }

});

module.exports = router;