const express = require('express');
const router = express.Router();

const Solicitudes = require('../models/solicitudes');
const Alertas_notificaciones = require('../models/alertas_notificaciones');
    
router.post('/', async (req,res) =>{
 try{  

    //Vectores de solicitudes, notificaciones y alertas
    //cada posición representa un mes
    //cada vector se inicializa con ceros para posteriormente realizar el conteo por mes
    let solicitudesMes = [0,0,0,0,0,0,0,0,0,0,0,0]
    let notificacionesMes = [0,0,0,0,0,0,0,0,0,0,0,0]
    let alertasMes = [0,0,0,0,0,0,0,0,0,0,0,0]
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]
            
    
    //fecha INICIAL
    fechaInicial = new Date(req.body[0])    
    milisegundosInicial = fechaInicial.getTime()
    mesInicial = fechaInicial.getMonth()
    
    //fecha FINAL
    fechaFinal = new Date(req.body[1])    
    milisegundosFinal = fechaFinal.getTime()
    mesFinal = fechaFinal.getMonth()
     

    const solicitudes = await Solicitudes.find()
    
    solicitudes.forEach(function(element) { 
        //se obtiene la fecha en milisegundos de cada SOLICITUD y su respectivo mes
        fechaSolicitud = new Date (element.fecha)
        mesSolicitud = fechaSolicitud.getMonth()
        milisegundosSolicitud = fechaSolicitud.getTime()
        //se compara cada SOLICITUD si se encuentra dentro del rango de fechas seleccionado
        if(milisegundosInicial<milisegundosSolicitud && milisegundosSolicitud<milisegundosFinal){
            //Si se encuentra dentro del rango de fechas
            //se suma una SOLICITUD en la posición del mes correspondiente
            solicitudesMes[mesSolicitud] = ++solicitudesMes[mesSolicitud]
        }
    })
        solicitudesMes = solicitudesMes.slice(mesInicial, mesFinal+1)

    const notificaciones = await Alertas_notificaciones.find({tipo:'Notificación'})
    
    notificaciones.forEach(function(element) { 
        //se obtiene la fecha en milisegundos de cada NOTIFICACION y su respectivo mes
        fechaNotificacion = new Date (element.fecha)
        mesNotificacion = fechaNotificacion.getMonth()
        milisegundosNotificacion = fechaNotificacion.getTime()
        //se compara cada NOTIFICACION si se encuentra dentro del rango de fechas seleccionado
        if(milisegundosInicial<milisegundosNotificacion && milisegundosNotificacion<milisegundosFinal){
            //Si se encuentra dentro del rango de fechas
            //se suma una NOTIFICACION en la posición del mes correspondiente
            notificacionesMes[mesNotificacion] = ++notificacionesMes[mesNotificacion]             
        }          
    })
        notificacionesMes = notificacionesMes.slice(mesInicial, mesFinal+1)

    const alertas = await Alertas_notificaciones.find({tipo:'Alarma'})
    alertas.forEach(function(element) { 
        //se obtiene la fecha en milisegundos de cada ALERTA y su respectivo mes
        fechaAlerta = new Date (element.fecha)
        mesAlerta = fechaAlerta.getMonth()
        milisegundosAlerta = fechaAlerta.getTime()
        //se compara cada NOTIFICACION si se encuentra dentro del rango de fechas seleccionado
        if(milisegundosInicial<milisegundosAlerta && milisegundosAlerta<milisegundosFinal){
            //Si se encuentra dentro del rango de fechas
            //se suma una ALERTA en la posición del mes correspondiente
            alertasMes[mesAlerta] = ++alertasMes[mesAlerta]
        }          
    }) 
        alertasMes = alertasMes.slice(mesInicial, mesFinal+1)

        meses = meses.slice(mesInicial, mesFinal+1)
        console.log(meses)
        //Finalmente se envían en el content los vectores correspondientes
      res.json({ status:'200', content: [solicitudesMes, notificacionesMes, alertasMes, meses]});
    } catch (error) {
        res.json({ status:400, content:error })
    }  
}),  



 module.exports = router;