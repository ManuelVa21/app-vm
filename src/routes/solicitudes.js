const express = require('express');
const router = express.Router();

const solicitudes = require('../models/solicitudes');

//Para obtener la lista de solicitudes
router.get('/', async (req,res) =>{
    await solicitudes.find(function(err, solicitudes){
        if (err) {throw errr;}
        else{
            res.json(solicitudes);
        }
    })
});

//Para enviar del cliente a la bd
router.post('/', async (req, res) => {
    //Guardar el dato que envia el navegador
    const solicitudes = new solicitudes(req.body);
    await solicitudes.save()
    .then(solicitudes => {
        res.status(200).json({solicitudes: 'Solicitud enviada correctamente'});
    })
    .catch(err =>{
        res.status(400).send({solicitudes: 'Error al enviar solicitud'});
    });
});

//Para actualizar los datos
router.put('/:id', async (req, res, next) =>{
    await solicitudes.findById(req.params.id), function(err,solicitudes){
        if (!solicitudes) {
            return next(new Error('No se puede cargar documento'));
        }
        else{
            solicitudes.detalle_recursos= req.body.solicitudes.detalle_recursos;
            solicitudes.detalle_aumento= req.body.solicitudes.detalle_aumento;
            solicitudes.motivo= req.body.solicitudes.motivo;

            solicitudes.save()
                .then(solicitudes =>{
                    res.json('Actualización completa')
                })
                .catch(err =>{
                    res.status(400).send({solicitudes:'Error al actualizar'});
                });
        }
    }
});

//Para eliminar datos
router.delete('/:id', async (req,res)=>{
    await solicitudes.findByIdAndRemove(req.params.id, function(err,solicitudes){
        if (err) { res.json(err);}
        else{
            res.json('Se elimino satisfactoriamente la solicitud');
        }
    })
});

module.exports = router;