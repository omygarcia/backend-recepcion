const jwt = require('jsonwebtoken');
const fs = require('fs');
const { dirname } = require('path');
const path = require('path');
const appDir = dirname(require.main.filename);

const generarJWT = (uid = '')=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid};
        jwt.sign(payload,process.env.JWT_SECRET_KEY,{
            expiresIn:'6h'
            //expiresIn:60,
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    });
}

const generarJWT2 = (uid = '',expires_in = '1h')=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid};
        //var ruta = process.env.APP== 'PROD'?process.env.SECRET_PATH:appDir+'\\public\\';
        //var privateKey = fs.readFileSync(path.join(ruta,'key.pem'), 'utf8');
        jwt.sign(payload/*,privateKey*/,process.env.JWT_SECRET_KEY,{
            expiresIn:expires_in,
            //algorithm:'RS256'
            //expiresIn:60,
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    });
}

const generarRefreshJWT = (uid = '',expires_in = '3900000')=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid};
        //var ruta = process.env.APP== 'PROD'?process.env.SECRET_PATH:appDir+'\\public\\';
        //var privateKey = fs.readFileSync(path.join(ruta,'key.pem'), 'utf8');
        jwt.sign(payload,process.env.JWT_SECRET_KEY,{
            expiresIn:expires_in,
            //algorithm:'RS256'
            //expiresIn:60,
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    });
}

module.exports = {
    generarJWT,
    generarJWT2,
    generarRefreshJWT
}