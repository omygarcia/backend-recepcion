const { Router } = require('express');
const { validationResult, check, body } = require('express-validator');
const {Visitante, TipoVisitante} = require('../model');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const {Op} = require('@sequelize/core');


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  //secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
  //tls: {
    // do not fail on invalid certs
    //rejectUnauthorized: false,
  //},
  secureConnection: false,
  tls: { ciphers: 'SSLv3' }
});

const router = Router();

router.get('/',async(req,res)=>{
  const visitantes = await Visitante.findAll({
    where:{delete:null}
});
  res.json(visitantes);
});

router.get('/show/:id',async(req,res)=>{
    try{
        const visitantes = await Visitante.findByPk(req.body.id_visitante);
        return res.json(visitantes);
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({error});
    }
  
});


router.get('/tipo-visitante',async(req,res)=>{
  const tipoVisitante = await TipoVisitante.findAll();
  res.json(tipoVisitante);
});


router.post('/create',[
    body('nombres').notEmpty().withMessage('El campo nombres es requerido')
            .isLength({min:3})
            .withMessage('El campo nombres debe contener al menos 3 caracteres'),
    body('apellidos').notEmpty().withMessage('El campo apellidos es requerido')
            .isLength({min:3})
            .withMessage('El campo apellidos debe contener al menos 3 caracteres'),
    body('telefono').notEmpty().withMessage('El campo telefono es requerido')
            .isLength({min:3})
            .withMessage('El campo telefono debe contener al menos 3 caracteres'),
    check('email','El email no tiene el formato correcto').isEmail(),
    body('motivo_visita').notEmpty().withMessage('El campo motivo cita es requerido'),
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

        console.log(visitante.id_visitante);

        const qrImage = await QRCode.toDataURL(""+visitante.id_visitante+"");

        const qrImageBuffer = Buffer.from(qrImage.split(",")[1], 'base64');

         let html = `
            <table style="width: 100%;text-align: center;">
              <thead style="background-color: #1e98e4ff;color:aliceblue;">
                  <tr>
                      <th>
                          <h2>Sistema Recepción UNIC S3</h2>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>
                          <h3>Acceso A la UNIC:</h3>
                          <div style="margin:0 auto;background-color: aliceblue;text-align: center;font-size: 1.7rem;padding: 10px;max-width: 250px;border-radius: 0.25rem;">
                              <img src="cid:qrimage" width="150" height="150" />
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
        `;

        const info = await transporter.sendMail({
          from: '"Sistema Recepcion UNIC" <sistemas.ayto.puebla@gmail.com>', // sender address
          to: `${visitante.email}, `, // list of receivers
          subject: "ALta Usuario", // Subject line
          html: html,
          attachments: [
            {
            filename: 'qr.png',
            content: qrImageBuffer,
            cid: 'qrimage' // el mismo ID que se usa en el HTML
            }
        ]
        });

        return res.json({'message':'El visitante se registro con exito!','data':visitante});
    } catch (error) {
        console.log(error);
        return res.status(500).json({'code':500,'message':error});
    }

});

router.delete('/delete/:id',async(req,res)=>{
  const empleado = await Visitante.findOne({
    where:{id_visitante:req.params.id}
  });
  empleado.delete = '1';
  await empleado.save();
  res.json({
    code:200,
    message:"El visitante se elimino con exito!"
  });
});

module.exports = router;