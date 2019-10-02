const express = require('express');
const router = express.Router();

const recursos_telco = require('../models/recursos_telco');

//Para obtener datos
router.get('/', async (req,res) =>{
    await recursos_telco.find(function(err,recursos_telco){
        if (err) { throw err; }
        else{ res.json(recursos_telco);}
    })
});

//Para enviar datos
router.post('/', async (req,res) =>{
    //Guardar el dato que envia el navegador
    const recursos_telco = new recursos_telco(req.body);
    await recursos_telco.save()
    .then(recursos_telco => {
        res.status(200).json({recursos_telco: 'Información registrada correctamente'});
    })
    .catch(err =>{
        res.status(400).send({recursos_telco: 'Error al registrar información'});
    });
});

//Para actualizar los datos
router.put('/:id', async (req, res, next) =>{
    await recursos_telco.findById(req.params.id), function(err,recursos_telco){
        if (!recursos_telco) {
            return next(new Error('No se puede cargar documento'));
        }
        else{
            recursos_telco.número_vm = req.body.recursos_telco.número_vm;
            recursos_telco.blade = req.body.recursos_telco.blade;
            recursos_telco.blade_uso = req.body.recursos_telco.blade_uso;

            recursos_telco.save()
                .then(recursos_telco =>{
                    res.json('Actualización completa')
                })
                .catch(err =>{
                    res.status(400).send({recursos_telco:'Error al actualizar'});
                });
        }
    }
});

router.delete('/:id', async (req,res)=>{
    await recursos_telco.findByIdAndRemove(req.params.id, function(err,recursos_telco){
        if (err) { res.json(err);}
        else{
            res.json('Se elimino el pool de recursos satisfactoriamente');
        }
    })
});

module.exports = router;