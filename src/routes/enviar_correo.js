const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

//const alertas_notificaciones = require('../models/alertas_notificaciones');

//Para obtener la listas de alertas y notificaciones


//Para enviar del cliente a la bd
router.post('/', async (req, res) => {
    
    
    //Transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'diegofernandov@unicauca.edu.co', // TODO: your gmail account
            pass: 'Lokatre951208' // TODO: your gmail password
        }
    });


    let mailOptions = {
        from: 'diegofernandov@unicauca.edu.co', // Quie envía el correo
        to: req.body.correo_usuario, // Quien recibe el correo
        subject: 'Notificación plataforma Telco 2.0',        // 
        text: req.body.mensaje
    };

    //
    
    await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
           res.json({ status:400 })           
        }
        res.json({ status: 200 });
        
        
    });
    //res.json({ status:'200', answer:"Información recibida" });
    //Guardar el dato que envia el navegador
    /*const alertas_notificaciones = new alertas_notificaciones(req.body);
    await alertas_notificaciones.save()
    .then(alertas_notificaciones => {
        res.status(200).json({alertas_notificaciones: 'Enviado correctamente'});
    })
    .catch(err =>{
        res.status(400).send({alertas_notificaciones: 'Error al enviar'});
    }); */
});



module.exports = router;