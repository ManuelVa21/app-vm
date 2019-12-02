const express = require('express');
const router = express.Router();

const alertas_notificaciones = require('../models/alertas_notificaciones');

//Para obtener la listas de alertas y notificaciones
router.get('/', async (req,res) =>{
    await alertas_notificaciones.find(function(err, alertas_notificaciones){
        if (err) {throw errr;}
        else{
            res.json(alertas_notificaciones);
        }
    })
});

//Para enviar del cliente a la bd
router.post('/', async (req, res) => {
    //Guardar el dato que envia el navegador
    const alertas_notificaciones = new alertas_notificaciones(req.body);
    await alertas_notificaciones.save()
    .then(alertas_notificaciones => {
        res.status(200).json({alertas_notificaciones: 'Enviado correctamente'});
    })
    .catch(err =>{
        res.status(400).send({alertas_notificaciones: 'Error al enviar'});
    });
});

//Para actualizar los datos
router.put('/:id', async (req, res, next) =>{
    await alertas_notificaciones.findById(req.params.id), function(err,alertas_notificaciones){
        if (!alertas_notificaciones) {
            return next(new Error('No se puede cargar documento'));
        }
        else{
            alertas_notificaciones.descripcion= req.body.alertas_notificaciones.descripcion;
            alertas_notificaciones.estado= req.body.alertas_notificaciones.estado;
            alertas_notificaciones.save()
                .then(alertas_notificaciones =>{
                    res.json('Actualización completa')
                })
                .catch(err =>{
                    res.status(400).send({alertas_notificaciones:'Error al actualizar'});
                });
        }
    }
});

router.delete('/:id', async (req,res)=>{
    await alertas_notificaciones.findByIdAndRemove(req.params.id, function(err,alertas_notificaciones){
        if (err) { res.json(err);}
        else{
            res.json('Se elimino satisfactoriamente');
        }
    })
});

module.exports = router;