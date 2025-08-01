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


router.get('/:id',async(req,res)=>{
  const empleado = await Empleado.findByPk(req.params.id);
  res.json(empleado);
});



router.put('/update/:id',[
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
        const empleado = await Empleado.findOne({
           where:{id_empleado: req.params.id}
        }); 
        
        
  
        empleado.nombres      = nombres;
        empleado.apellidos    = apellidos;
        empleado.cargo        = cargo;
        empleado.departamento = departamento;
        empleado.email        = email;

        await empleado.save();

        return res.json({'message':'El empleado se actualizo con exito!','data':empleado});
    } catch (error) {
        console.log(error);
        return res.status(500).json({'code':500,'message':error});
    }

});


router.delete('/delete/:id',async(req,res)=>{
  const empleado = await Empleado.findOne({
    where:{id_empleado:req.params.id}
  });
  await empleado.destroy();
  res.json({
    code:200,
    message:"El empleado se elimino con exito!"
  });
});

module.exports = router;