


const express = require('express');
const router = express.Router();

const Pool_recursos = require('../models/pool_recursos');

//Para obtener los datos acerca de los pool de recursos
router.get('/', async (req,res) =>{
    try {
        const pool_recursos = await Pool_recursos.find();
        if (!pool_recursos) {
            res.json({ status:404, content:pool_recursos })            
        } else {
            res.json({ status:200, content:pool_recursos })            
        }
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para obtener los datos de un solo pool
router.get('/unpool', async (req,res) =>{
    //console.log('Ruta de un proyecto')
    console.log(req.query)
    try {
        const pool_recursos = await Pool_recursos.findOne(req.query);
        //console.log(pool_recursos)
        if (!pool_recursos) {
            res.json({ status:404, content:pool_recursos })            
        } else {
            res.json({ status:200, content:pool_recursos })            
        }
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para enviar del cliente a la bd
router.post('/', async (req, res) => {
    try {
        //console.log('Se mira el request')
        console.log(req.body)
        const pool_recursos = new Pool_recursos(req.body)
        await pool_recursos.save();
        res.json({ status:'200', answer:"Pool de recursos creado" });
        
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

//Para actualizar los datos
/*
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
*/

router.delete('/', async (req,res) => {
    console.log('Se va a eliminar')
    console.log(req.query)
    await Pool_recursos.findByIdAndRemove(req.query._id);
    res.json({ status:'200', answer:"Pool de recursos eliminado" });
});

module.exports = router;


