var express = require('express');
var router = express.Router();

var Solicitudes = require('../models/solicitudes');
//import Solicitudes from '../models/solicitudes';
//Para obtener la lista de solicitudes
router.get('/', async (req,res) =>{
    await Solicitudes.find(function(err, solicitudes){
        if (err) {throw errr;}
        else{
            //res.json(solicitudes);
            console.log('Se muestra la respuesta del get')
            console.log(res)
            console.log('Se muestra la respuesta del get solicitudes')
            console.log(solicitudes)
        }
    })
    .catch(err =>{
        res.status(400).send({solicitudes: 'Error al procesar'});
    });
});

//Para enviar del cliente a la bd
router.post('/PanelUsuario/Peticiones', async (req, res) => {
    //Guardar el dato que envia el navegador
    console.log('Se mira el request')
    console.log(req)
    console.log('Se mira el request.body')
    console.log(req.body)
    console.log('Se mira el request.query')
    console.log(req.query)
    var Solicitudes = new Solicitudes(req.body);
    await Solicitudes.save()
    .then(res => {
        console.log('Se muestra el res despues del await')
        console.log(res)
        //res.status(200).json({solicitudes: 'Solicitud enviada correctamente'});
    })
    .catch(err =>{
        console.log('se muestra el error del await')
        console.log('Error ',err)
        //res.status(400).send({solicitudes: 'Error al enviar solicitud'});
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
    .catch(err =>{
        res.status(400).send({solicitudes: 'Error al procesar'});
    });
});

module.exports = router;