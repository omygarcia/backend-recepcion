const { response } = require("express");

const esAdminRole = (req,res = response,next)=>{
    if(!req.usuario)
    {
        return res.status(500).json({
            msg:"Se tiene que validar el token antes que el rol"
        });
    }

    const {rol, nombre} = req.usuario;
    if(rol !== 'ADMIN_ROLE')
    {
        return res.status(401).json({
            code:"COD_NO_AUTHORIZE",
            msg:''+nombre+'no es administrador'
        });
    }

    next();
}

const tieneRole = (...roles)=>{
    return (req, res = response,next)=>{
        if(!req.usuario)
        {
            return res.status(500).json({
                msg:"Se tiene que validar el token antes que el rol"
            });
        }
        if(!roles.includes(req.usuario.rol))
        {
            return res.status(401).json({
                code:"COD_NO_AUTHORIZE",
                msg:`El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}