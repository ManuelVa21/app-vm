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
router.put('/', async (req,res) =>{
    try {
        console.log('Se mira el req.body', req.body)
        console.log('Se mira el req.query', req.query._id)
        const pool = new Pool_recursos(req.body)
        const idpool = req.query._id
        await Pool_recursos.findByIdAndUpdate(idpool,{$set: pool },{ new: true} );
        res.json({ status:'200', answer:"Pool actualizado" });
    } catch (error) {
        res.json({ status:400, content:error })
    }
});

router.delete('/', async (req,res) => {
    console.log('Se va a eliminar')
    console.log(req.query)
    await Pool_recursos.findByIdAndRemove(req.query._id);
    res.json({ status:'200', answer:"Pool de recursos eliminado" });
});

module.exports = router;


