const { Router } = require('express');
const { validationResult, check, body } = require('express-validator');
const {Area} = require('../model');

const router = Router();


const PDFDocument = require('pdfkit');
const fs = require('fs');
const QRCode = require('qrcode');

// Datos del área
const area = {
  nombre: 'Laboratorio de Física',
  responsable: 'Dra. Ana Torres',
  edificio: 'Edificio B',
  salon: 'B-203',
  latitud: '19.0454',
  longitud: '-98.1989',
  hora_salida: '18:00',
  qrData: 'https://miapp.com/area/123' // URL o texto que irá en el QR
};

// Función para generar el PDF
async function generarPDFConQR(area,res) {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  // Título
  doc.fontSize(20).text('Información del Área', { align: 'center' });
  doc.moveDown();

  // Datos del área
  doc.fontSize(12).text(`Nombre: ${area?.nombre_area}`);
  doc.text(`Responsable: ${area?.responsable}`);
  doc.text(`Edificio: ${area?.edificio}`);
  doc.text(`Salón: ${area?.salon}`);
  doc.text(`Latitud: ${area?.latitud}`);
  doc.text(`Longitud: ${area?.longitud}`);
  doc.text(`Hora de salida: ${area?.hora_salida}`);
  doc.moveDown();

  // Generar QR como imagen base64
  const qrImage = await QRCode.toDataURL(area?.codigo_qr || 'PRUEBA');

  // Insertar QR en el PDF
  doc.image(qrImage, {
    fit: [150, 150],
    align: 'center',
    valign: 'center'
  });

  doc.end();
  console.log('✅ PDF generado con éxito: area_qr.pdf');
}




router.get('/:id',async(req,res)=>{
  const area = await Area.findOne({where:{id_area:req.params.id}});
  generarPDFConQR(area,res);
  //res.json(areas);
});


module.exports = router;