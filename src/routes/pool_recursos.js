const express = require('express');
const router = express.Router();

const pool_recursos = require('../models/pool_recursos');

//Para obtener los datos acerca de los pool de recursos
router.get('/', async (req,res) =>{
    await pool_recursos.find(function(err, pool_recursos){
        if (err) {throw errr;}
        else{
            res.json(pool_recursos);
        }
    })
});

//Para enviar del cliente a la bd
router.post('/', async (req, res) => {
    const pool_recursos = new pool_recursos(req.body);
     await pool_recursos.save()
    .then(pool_recursos => {
        res.status(200).json({pool_recursos: 'Pool de recursos asignado correctamente'});
    })
    .catch(err =>{
        res.status(400).send({pool_recursos: 'Error al asignar el pool de recursos'});
    });
});

//Para actualizar los datos
router.put('/:id', async (req, res, next) =>{
    await pool_recursos.findById(req.params.id), function(err,pool_recursos){
        if (!pool_recursos) {
            return next(new Error('No se puede cargar documento'));
        }
        else{
            pool_recursos.nombre_proyecto= req.body.pool_recursos.nombre_proyecto;
            pool_recursos.descripcion = req.body.pool_recursos.descripcion;
            pool_recursos.propietario = req.body.pool_recursos.propietario;
            pool_recursos.numero_vm = req.body.pool_recursos.numero_vm;
            pool_recursos.disco_duro = req.body.pool_recursos.disco_duro;
            pool_recursos.ram = req.body.pool_recursos.ram;
            pool_recursos.cpu = req.body.pool_recursos.cpu;
            pool_recursos.fecha_inicio = req.body.pool_recursos.fecha_inicio;
            pool_recursos.fecha_fin = req.body.pool_recursos.fecha_fin;
            pool_recursos.vms = req.body.pool_recursos.vms;


            pool_recursos.save()
                .then(pool_recursos =>{
                    res.json('Actualización completa')
                })
                .catch(err =>{
                    res.status(400).send({pool_recursos:'Error al actualizar'});
                });
        }
    }
});

router.delete('/:id', async (req,res,next) => {
    await pool_recursos.findByIdAndRemove(req.params.id, function(err,pool_recursos){
        if (err) { res.json(err); }
        else {
            res.json('Se elimino el pool de recursos satisfactoriamente');
        }
    })
});


module.exports = router;


