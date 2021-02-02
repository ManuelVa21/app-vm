//const axios = require("axios");
const express = require('express');
const router = express.Router();

const Pool_recursos = require('../models/pool_recursos');
const Alertas_notificaciones = require('../models/alertas_notificaciones');
const nodemailer = require('nodemailer');

var milisegundosDia = 24*60*60*1000;  // se tienen los milisegundos de un día
var fechaActual = new Date();         // Se toma la fecha actual para comparar

//Para obtener los datos acerca de los pool de recursos
router.get('/', async (req,res) =>{
try {  
     
    const pool_recursos = await Pool_recursos.find({estado:"Activo"}); // Se traen los proyectos Activos
        
        
        pool_recursos.forEach(function(element) { 
            
          
            fecha_fin = new Date (element.fecha_fin)
            let milisegundosDiferencia = (element.fecha_fin.getTime() - fechaActual.getTime()) // se tienen los milisegundos de diferencia
            let diasRestantes = Math.round(milisegundosDiferencia/milisegundosDia)  //se calculan cuantos días hay de diferencia y se redondea con Math.round
// Más de un mes
            if (diasRestantes > 30) {
                //console.log("no pasa nada")
            }
// Menos de un mes y más de 8 días  se envía una notificación al usuario solamente
            else if ( 30 >= diasRestantes && diasRestantes > 8){
                let notificacion = {
                    "tipo" : 'Notificación',
                    "descripcion" : 'El proyecto: '+element.nombre_proyecto+ ' finaliza en: '+diasRestantes+
                                    ' días. Si requiere más tiempo, realice una solicitud de aumento de pool de recursos con el tiempo requerido',
                    "usuario_destino" : element.propietario,
                    "correo_usuario" : element.emailPropietario,
                    "subject" : 'Notificación plataforma Telco 2.0'
                }           
                
                enviarNotificacion(notificacion);
                enviarCorreo(notificacion)
                
            }
//Menos de 8 días Se envía una ALERTA al usuario y luego al administrador
            else if (diasRestantes>0){
                let notificacion = {
                    "tipo" : 'Alerta',
                    "descripcion" : 'El proyecto: '+element.nombre_proyecto+ ' finaliza en: '+diasRestantes+
                                    ' días. Si requiere más tiempo, realice una solicitud de aumento de pool de recursos con el tiempo requerido',
                    "usuario_destino" : element.propietario,
                    "correo_usuario" : element.emailPropietario,
                    "subject" : "Alerta plataforma Telco 2.0"
                }
                enviarNotificacion(notificacion);
                enviarCorreo(notificacion)
                let notificacionAdmin = {
                    "tipo" : 'Alerta',
                    "descripcion" : 'El proyecto: '+element.nombre_proyecto+ ' finaliza en: '+diasRestantes+
                                    ' días. Por favor comuníquese con el usuario o director del proyecto',
                    "usuario_destino" : 'Administrador',
                    "correo_usuario" : 'diegofernandov@unicauca.edu.co', //Poner el correo del Admin
                    "subject" : "Alerta plataforma Telco 2.0"
                }
                enviarNotificacion(notificacionAdmin);
                enviarCorreo(notificacionAdmin)
                
            }
// YA finalizó el project se envía ALERTA al usuario y admin. Además, se cambia de estado el proyecto a "Revisar"
            else{
                let notificacion = {
                    "tipo" : 'Alerta',
                    "descripcion" : 'Finalizó el tiempo solicitado del proyecto: '+element.nombre_proyecto+ '.' +
                                     'Si requiere más tiempo, realice una solicitud de aumento de pool de recursos con el tiempo requerido',
                    "usuario_destino" : element.propietario,
                    "correo_usuario" : element.emailPropietario,
                    "subject" : "Alerta plataforma Telco 2.0"
                }
                enviarCorreo(notificacion)
                enviarNotificacion(notificacion)                
                cambiarEstado(element._id)
                let notificacionAdmin = {
                    "tipo" : 'Alerta',
                    "descripcion" : 'Finalizó el tiempo solicitado del proyecto: '+element.nombre_proyecto+ '.' +
                                    'Por favor comuníquese con el usuario o director del proyecto y revise el estado del proyecto.',
                    "usuario_destino" : 'Administrador',
                    "correo_usuario" : 'diegofernandov@unicauca.edu.co', //Poner el correo del admin
                    "subject" : "Alerta plataforma Telco 2.0"
                }
                enviarCorreo(notificacionAdmin)
                enviarNotificacion(notificacionAdmin)                
            }

        })
        res.json({ status:200, content:fechaActual })   

    } catch (error) {
        res.json({ status:400, content:error })
    }
});

// ENVIAR NOTIFICACIÓN A LA APP 
async function enviarNotificacion (notificacion){ 

    //console.log(notificacion)
    const alertas_notificaciones = new Alertas_notificaciones(notificacion);
    await alertas_notificaciones.save(function(err, res){
        if(err){
            console.log(err)
        }
        else{
            console.log(res)
        }
    });
    

}
//ENVIAR CORREOS
async function enviarCorreo (notificacion){   
  
    let transporter = nodemailer.createTransport({
        // si el correo del admin es gmail, ir al siguiente enlace y 
        //  permitir el acceso de apliaciones menos seguras
        //  https://myaccount.google.com/lesssecureapps
        service: 'gmail',
        auth: {
            user: 'diegofernandov@unicauca.edu.co', // Correo del Admin 
            pass: 'Lokatre951208' // Contraseña del correo
        }
    });
    
    let mailOptions = {
        from: 'diegofernandov@unicauca.edu.co', // Quie envía el correo
        to: notificacion.correo_usuario, // Quien recibe el correo
        subject: notificacion.subject,        // 
        text: notificacion.descripcion
    };    
    
    await transporter.sendMail(mailOptions, (err, data) => {
        
    });
}
//CAMBIAR EL ESTADO DEL PROYECTO

async function cambiarEstado (element){
    //console.log(element)
   
    await Pool_recursos.findByIdAndUpdate({_id: element},{estado: "Revisar"});       
   
}

module.exports = router;