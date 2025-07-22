const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { usuarioModel } = require('../models');
const fs = require('fs');
const { dirname } = require('path');
const path = require('path');
const appDir = dirname(require.main.filename);

const validaJWT = async(req = request, res = response, next)=>{
    const token = req.header('x-token') || req.header('Authorization')?.split('Bearer ')[1];
    if(!token)
    {
        return res.status(401).json({
            code:"COD_NOT_TOKEN",
            message:"No hay token en la petición"
        });
    }

    try{
        //var ruta = process.env.APP == 'PROD'?process.env.SECRET_PATH:appDir+'\\public\\';
        //var publicKey = fs.readFileSync(path.join(ruta,'key.public.pem'), 'utf8');
        //const {uid} =jwt.verify(token,publicKey, { algorithms: ['RS256'] });
        const {uid} =jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log('token estru',jwt.verify(token,process.env.JWT_SECRET_KEY))
        const usuario = await usuarioModel.findOne({_id:uid});

        //console.log('usuario',usuario)
        //validamos si existe el usuario
        if(!usuario)
        {
            return res.status(401).json({
                msg:"Token no valido - El usuario no existe en la db"
            });
        }

        //validamos si el usuario esta activo
        if(!usuario.estado)
        {
            return res.status(401).json({
                msg:"Token no valido - Usuario Inactivo"
            });
        }
        req.usuario = usuario;
        next();
    }
    catch(error)
    {
       console.log(error);
       return res.status(401).json({
            msg:'Token no valido'
       });
    }
}


//function normal
const validaRefreshJWT = async(refresh_token = null)=>{
    //const token = req.header('x-token') || req.header('Authorization')?.split('Bearer ')[1];
    const refreshToken =  refresh_token;
    if(!refreshToken)
    {
        return {
            status:false,
            code:"COD_NOT_TOKEN",
            message:"No hay token en la petición"
        };
    }

    try{
       /* var ruta = process.env.APP == 'PROD'?process.env.SECRET_PATH:appDir+'\\public\\';
        var publicKey = fs.readFileSync(path.join(ruta,'key.public.pem'), 'utf8');
        const {uid} =jwt.verify(token,publicKey, { algorithms: ['RS256'] });*/
        const {uid} = jwt.verify(refreshToken,process.env.JWT_SECRET_KEY);
        //console.log('token estru',jwt.verify(token,process.env.JWT_SECRET_KEY))
        const usuario = await usuarioModel.findOne({_id:uid});

        //console.log('usuario',usuario)
        //validamos si existe el usuario
        if(!usuario)
        {
            return {
                status:false,
                code:'401',
                message:"Token no valido - El usuario no existe en la db"
            };
        }

        //validamos si el usuario esta activo
        if(!usuario.estado)
        {
            return {
                status:false,
                code:"401",
                message:"Token no valido - Usuario Inactivo"
            };
        }

        return {
            status:true,
            code:200,
            message:"ok"
        }
    }
    catch(error)
    {
       console.log(error);
       return {
            status:false,
            code:'500',
            message:'Token no valido'
       };
    }
}

module.exports = {
    validaJWT,
    validaRefreshJWT
}