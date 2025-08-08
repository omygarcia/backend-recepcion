const { Router } = require('express');
const { Empleado } = require('../model');
const { generarJWT2 } = require('../helpers/generar-jwt');
const { validationResult, check, body } = require('express-validator');
const bcryptjs =  require('bcryptjs');

const router = Router();

router.post('/login',[
    check('correo','El email no tiene el formato correcto').isEmail(),
    body('password').notEmpty().withMessage('El password es requerido')
            .isLength({min:3})
            .withMessage('El campo password debe contener al menos 3 caracteres')
],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.json({
            code:'401',
            message:'Error al formar la consulta, revise el formato de los campos',
            errors:errors.array()
        });
    }

    const {correo,password} = req.body;

    try
    {
        //verificar si existe el correo
        //const usuario = await usuarioModel.findOne({correo});
        const usuario = await Empleado.findOne({
           where:{email:correo,password:password}
        });
        if(!usuario)
        {
            return res.status(400).json({code:"400",message:"Usuario o contraseña incorrectos"})
        }

        //verificar si el usuario esta activo
        /*if(!usuario.estado)
        {
            return res.status(400).json({code:"400",message:"Usuario o contraseña incorrectos - inactivo"})
        }*/

        //verificar password con bcryctjs
        /*const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword)
        {
            return res.status(400).json({code:"400",message:"Usuario o contraseña incorrectos - password"})
        }*/

        //generamos el token
        const token = await generarJWT2(usuario.id_empleado,'6h');

        return res.json({
          code:"200",
          message:'Login con exito!',
          usuario,
          token
        });

    }
    catch(error)
    {
        return res.json({code:"500",message:error});
    }

    
});

module.exports = router;